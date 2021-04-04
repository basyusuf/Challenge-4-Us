import { Controller, Get } from '@nestjs/common';
import { ChallengeService } from './challenge.service';

@Controller('challenge')
export class ChallengeController {
    constructor(private challengeService:ChallengeService){}
    @Get()
    findAll(): string {
    return 'This action returns all cats';
    }
}
