import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChallengeController } from './challenge/challenge.controller';
import { ChallengeModule } from './challenge/challenge.module';

console.log("URL:",join(__dirname, '..', 'public'))
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    ChallengeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
