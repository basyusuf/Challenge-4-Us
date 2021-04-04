import { EntityRepository, Repository } from "typeorm";
import { Follower } from "./follower.entity";

@EntityRepository(Follower)
export class FollowerRepository extends Repository<Follower> {
    
}