import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto:CreateUserDto):Promise<User>{
        const { username, password, email } = createUserDto;
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        try{
            await user.save();
        } catch(err){
            console.log("User save error:",err);
            if(err.code == "23505"){
                throw new ConflictException('User allready exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        delete user.password;
        return user;
    }

    async validateUserPassword(loginUserDto:LoginUserDto):Promise<User|null>{
        const {username,password} = loginUserDto;
        const user = await this.findOne({username});
        if(user){
            console.info("User found!",user);
            let validateStatus = await user.validatePassword(password);
            if(validateStatus){
                return user;
            }
        }
        return null;
    }
}