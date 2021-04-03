import { Injectable } from '@nestjs/common';
import { ServiceResponse } from './helper/ServiceResponse';

@Injectable()
export class AppService {
  healthCheck(): ServiceResponse {
    return new ServiceResponse({statusCode:200,message:'OK!'});
  }
}
