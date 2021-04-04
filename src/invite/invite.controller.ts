import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteRepository } from './invite.repository';

@Controller('invite')
export class InviteController {
    constructor(@InjectRepository(InviteRepository) inviteRepository:InviteRepository){}
}
