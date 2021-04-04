import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserStatusEnum } from './enums/user-status.enum';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { serverConfig } from '../config/server.config';
@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    account_name:string;

    @Column({unique:true,length:50})
    username: string;

    @Column()
    password: string;

    @Column({length:70,unique:true})
    email:string;

    @Column({nullable:true,default:'/man.png'})
    image:string;

    @Column({nullable:true})
    profile_text:string;

    @Column({length:50,default:UserStatusEnum.PENDING_ACTIVATION})
    status:UserStatusEnum;

    @Column({nullable:true})
    action_token:string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    @BeforeInsert()
    async beforeInsertFunction(){
        let salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(this.password,salt);
        this.password = password;
        if(!this.account_name){
            this.account_name = this.username;
        }
    }

    async validatePassword(attempt:string):Promise<boolean>{
        const compareStatus = await bcrypt.compare(attempt,this.password);
        return compareStatus;
    }

    generateUserToken():string{
        let token = jwt.sign({id:this.id},serverConfig.secret_key,{expiresIn:serverConfig.expire_time});
        return token;
    }
}