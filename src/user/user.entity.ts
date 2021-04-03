import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserStatusEnum } from './enums/user-status.enum';
import * as bcrypt from 'bcryptjs';
@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    account_name:string;

    @Column({unique:true,length:50})
    username: string;

    @Column()
    password: string;

    @Column({length:70,unique:true})
    email:string;

    @Column({nullable:true,default:'/images/default.png'})
    image:string;

    @Column({nullable:true})
    profile_text:string;

    @Column({length:50,default:UserStatusEnum.PENDING_ACTIVATION})
    status:UserStatusEnum;

    @Column({nullable:true})
    action_token:string;

    @BeforeInsert()
    async beforeInsertFunction(){
        let salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(this.password,salt);
        this.password = password;
    }

    async validatePassword(attempt:string):Promise<boolean>{
        const compareStatus = await bcrypt.compare(attempt,this.password);
        return compareStatus;
    }
}