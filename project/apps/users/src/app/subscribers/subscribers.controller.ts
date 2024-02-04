import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RequestWithTokenPayload } from '@project/libs/shared/app/types';
import { AuthKeyName } from '@project/shared/helpers';
import { SubscribersService } from './subscribers.service';
import { MongoIdValidationPipe } from '@project/shared/core';

@ApiTags('subscribers')
@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Post('/:userId')
  public async addSubscriber(
    @Req() { user: subscriberUser }: RequestWithTokenPayload,
    @Param('userId', MongoIdValidationPipe) userId: string
  ) {
    return this.subscribersService.createSubscriber(
      String(subscriberUser?.sub),
      userId
    );
  }

  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  public async deleteSubscriber(
    @Req() { user: subscriberUser }: RequestWithTokenPayload,
    @Param('userId', MongoIdValidationPipe) userId: string
  ) {
    return this.subscribersService.deleteSubscriber(
      String(subscriberUser?.sub),
      userId
    );
  }
}
