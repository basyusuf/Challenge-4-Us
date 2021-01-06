import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatusEnum } from "./enums/user-status.enum";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto:CreateUserDto):Promise<User>{
        
        const { username, password, email } = createUserDto;
        
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password,user.salt);
        user.status = UserStatusEnum.PENDING_ACTIVATION;
        user.email = email;
        try{
            await user.save();
        } catch(err){
            if(err.code == "23505"){
                throw new ConflictException('User allready exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        delete user.password;
        return user;
    }

    async validateUserPassword(loginUserDto:LoginUserDto){
        const {username,password} = loginUserDto;
        const user = await this.findOne({username});
        if(user && await user.validatePassword(password)){
            return user.username;
        } else {
            return null;
        }
    }

    private async hashPassword(password:string,salt:string){
        return bcrypt.hash(password,salt);
    }
}