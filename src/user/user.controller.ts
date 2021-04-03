import { Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { ServiceResponse } from '../helper/ServiceResponse';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) requestBody:CreateUserDto):Promise<ServiceResponse>{
        return this.userService.signUp(requestBody);
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) requestBody:LoginUserDto):Promise<ServiceResponse>{
        return this.userService.signIn(requestBody);
    }
}
