import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InviteTypeEnum } from "./enums/invite-type.enum";

@Entity('invite')
export class Invite extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    challenge_id:number;

    @Column()
    sender_id:number;

    @Column()
    recipient_id:number;

    @Column()
    type:InviteTypeEnum;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}