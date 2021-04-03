import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ServiceResponse } from './helper/ServiceResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  healthCheck(): ServiceResponse {
    return this.appService.healthCheck();
  }
}
