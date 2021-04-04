import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { FollowerStatusEnum } from "./enums/follower-status";


class Follower extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    follower_id:number;

    @Column()
    followed_id:number;

    @Column()
    status:FollowerStatusEnum;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}