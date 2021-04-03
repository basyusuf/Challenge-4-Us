import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository){}
    
    async signUp(createUserDto:CreateUserDto):Promise<User>{
        return this.userRepository.createUser(createUserDto);
    }

    async signIn(loginUserDto:LoginUserDto){
        const username = await this.userRepository.validateUserPassword(loginUserDto)
        if(!username){
            throw new UnauthorizedException('Invalid credentials')
        } else{
            return username;
        }
    }

}
