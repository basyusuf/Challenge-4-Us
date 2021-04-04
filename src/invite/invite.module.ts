import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import { InviteRepository } from './invite.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([InviteRepository])
  ],
  controllers: [InviteController],
  providers: [InviteService]
})
export class InviteModule {}
