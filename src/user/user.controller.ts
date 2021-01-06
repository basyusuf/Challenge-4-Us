import { Controller, Post, ValidationPipe } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body } from '@nestjs/common';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('/signup')
    async signup(@Body(ValidationPipe) requestBody:CreateUserDto):Promise<User>{
        return this.userService.createUser(requestBody);
    }
}
