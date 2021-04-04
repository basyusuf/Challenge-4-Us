import { EntityRepository, Repository } from "typeorm";
import { Challenge } from "./challenge.entity";

@EntityRepository(Challenge)
export class ChallengeRepository extends Repository<Challenge>{

}