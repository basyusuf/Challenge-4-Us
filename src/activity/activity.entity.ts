import { ChallengeRepeatType } from 'src/challenge/enums/challenge-repeat-type.enum';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ActivityStatusEnum } from './enums/activity-status.enum';

@Entity('activity')
export class Activity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    challenge_id:number;

    @Column()
    user_id:number;

    @Column()
    activity_status:ActivityStatusEnum;

    @Column()
    repeat_type:ChallengeRepeatType;

    @Column()
    repeat_value:string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}