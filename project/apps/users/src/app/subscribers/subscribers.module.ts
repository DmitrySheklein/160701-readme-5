import { Module } from '@nestjs/common';
import { SubscribersController } from './subscribers.controller';
import { AuthenticationModule } from '../authentication/authentication.module';
import { SubscribersService } from './subscribers.service';
import { BlogUserModule } from '../blog-user/blog-user.module';

@Module({
  imports: [AuthenticationModule, BlogUserModule],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
