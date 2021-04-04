import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { FollowerRepository } from './follower.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([FollowerRepository])
  ],
  controllers: [FollowerController],
  providers: [FollowerService]
})
export class FollowerModule {}
