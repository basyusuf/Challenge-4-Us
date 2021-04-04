import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { ChallengeRepository } from './challenge.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ChallengeRepository])],
  controllers: [ChallengeController],
  providers: [ChallengeService],
})
export class ChallengeModule {}
