import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ChallengeRepeatType } from "./enums/challenge-repeat-type.enum";
import { ChallengeStatusEnum } from './enums/challenge-status.enum';
import { ChallengeVisibilityEnum } from './enums/challenge-visibility.enum';

@Entity('challenge')
export class Challenge extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    owner_id:number;

    @Column({length:120})
    name: string;

    @Column('text',{nullable:true})
    description: string;

    @Column()
    goal:string;

    @Column({default:ChallengeVisibilityEnum.PUBLIC,length:20})
    visibility:ChallengeVisibilityEnum;

    @Column()
    start_date:Date;

    @Column({nullable:true})
    end_date:Date;

    @Column()
    repeat_size:number;

    @Column()
    repeat_unit:ChallengeRepeatType;

    @Column('text')
    notes:string;

    @Column({nullable:true})
    token:string;

    @Column({default:false})
    is_limited:boolean;

    @Column({nullable:true})
    max_user:number

    @Column({default:ChallengeStatusEnum.WAITING})
    status:ChallengeStatusEnum;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}