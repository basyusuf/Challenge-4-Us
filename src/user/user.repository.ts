import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserStatusEnum } from "./enums/user-status.enum";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(createUserDto:CreateUserDto):Promise<User>{
        const { username, password, email } = createUserDto;
        const user = new User();
        user.username = username;
        user.password = password;
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
}