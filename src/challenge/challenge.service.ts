import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChallengeRepository } from './challenge.repository';

@Injectable()
export class ChallengeService {
    constructor(
        @InjectRepository(ChallengeRepository)
        private challengeRepository:ChallengeRepository){}
}
