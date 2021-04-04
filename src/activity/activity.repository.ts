import { EntityRepository, Repository } from "typeorm";
import { Activity } from './activity.entity';

@EntityRepository(Activity)
export class ActivityRepository extends Repository<Activity>{

}