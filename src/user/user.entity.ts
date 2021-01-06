import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserStatusEnum } from './enums/user-status.enum';

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
    status:UserStatusEnum
}