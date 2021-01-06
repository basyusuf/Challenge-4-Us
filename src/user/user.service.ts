import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserStatusEnum } from './enums/user-status.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository){}
    
    async createUser(createUserDto:CreateUserDto){
        const { username, password, email } = createUserDto;
        const user = new User();
        user.username = username;
        user.password = password;
        user.status = UserStatusEnum.PENDING_ACTIVATION;
        user.email = email;
        await user.save();
        delete user.password;
        return user;
    }

}
