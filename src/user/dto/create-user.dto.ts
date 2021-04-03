import { Type } from "class-transformer";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @Type(()=> String)
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @Matches(/^[a-zA-Z0-9]+$/,
        {message:"Username must only contain alphabetic and number"})
    username:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message:"Password too weak!" })
    password:string;
    
    @IsEmail()
    email:string;
}