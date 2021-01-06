import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserStatusEnum } from './enums/user-status.enum';
import * as bcrypt from 'bcryptjs';
@Entity()
@Unique(['username',"email"])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email:string;

    @Column()
    status:UserStatusEnum;

    @Column()
    salt:string;

    async validatePassword(password:string):Promise<boolean>{
        const hash = await bcrypt.hash(password,this.salt);
        return hash === this.password;
    }
}