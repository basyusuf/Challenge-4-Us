import { ConflictException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./user.entity";
import { LoginUserDto } from './dto/login-user.dto';
import { ServiceResponse } from "src/helper/ServiceResponse";
@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto:CreateUserDto){
        const { username, password, email } = createUserDto;
        const user = new User();
        user.username = String(username);
        user.email = email;
        user.password = String(password);
        try{
            await user.save();
        } catch(err){
            console.log("User save error:",err);
            if(err.code == "23505"){
                throw new ConflictException('Username or email allready exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        delete user.password;
        return new ServiceResponse({statusCode:201,data:{user}}).get();
    }
    async validateUserPassword(loginUserDto:LoginUserDto):Promise<User|null>{
        const {username,password} = loginUserDto;
        const user = await this.findOne({username});
        if(user){
            console.info("User found!");
            let validateStatus = await user.validatePassword(password);
            if(validateStatus){
                return user;
            }
        }
        return null;
    }
}