import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule } from '@project/config/users';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@project/shared/helpers';
import { NotifyModule } from './notify/notify.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    ConfigUsersModule,
    NotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('db')),
    SubscribersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
