import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository){}
    
    async createUser(createUserDto:CreateUserDto):Promise<User>{
        return this.userRepository.createUser(createUserDto);
    }

}
