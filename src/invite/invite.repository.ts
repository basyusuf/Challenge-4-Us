import { EntityRepository, Repository } from "typeorm";
import { Invite } from './invite.entity';

@EntityRepository(Invite)
export class InviteRepository extends Repository<Invite>{

}