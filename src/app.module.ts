import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChallengeModule } from './challenge/challenge.module';
import { FollowerModule } from './follower/follower.module';
import { ActivityModule } from './activity/activity.module';
import { InviteModule } from './invite/invite.module';

console.log("URL:",join(__dirname, '..', 'public'))
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    ChallengeModule,
    FollowerModule,
    ActivityModule,
    InviteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
