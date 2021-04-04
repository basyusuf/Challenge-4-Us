import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityRepository } from './activity.repository';

@Injectable()
export class ActivityService {
    constructor(@InjectRepository(ActivityRepository) activityRepository:ActivityRepository){}
}
