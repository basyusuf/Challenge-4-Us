import { Injectable, InternalServerErrorException, UnauthorizedException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ServiceResponse } from '../helper/ServiceResponse';
import { RedisHelper } from '../helper/RedisHelper';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository){}
    
    async signUp(createUserDto:CreateUserDto){
        return this.userRepository.createUser(createUserDto);
    }

    async signIn(loginUserDto:LoginUserDto){
        const username = await this.userRepository.validateUserPassword(loginUserDto)
        if(!username){
            return new ServiceResponse({statusCode:400,message:'Username or password wrong!'});
        } else{
            try{
                let redisInstance = new RedisHelper();
                let haveTokenStatus = await redisInstance.getItem(username.id);
                if(haveTokenStatus){
                    return new ServiceResponse({statusCode:201,data:{token:haveTokenStatus}});
                } else {
                    let token = username.generateUserToken();
                    let setItem = await redisInstance.setItem(username.id,token);
                    return new ServiceResponse({statusCode:200,data:{token}});
                }
            } catch(err){
                throw new InternalServerErrorException();
            }
            
        }
    }

}
