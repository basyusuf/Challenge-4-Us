import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowerRepository } from './follower.repository';

@Injectable()
export class FollowerService {
    constructor(@InjectRepository(FollowerRepository) private followerRepository:FollowerRepository){}
    
}
