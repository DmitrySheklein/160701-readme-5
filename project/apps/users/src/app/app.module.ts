import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigUsersModule, getMongooseOptions } from '@project/config/users';
import { MongooseModule } from '@nestjs/mongoose';
import { FetchDataModule } from './fetch-data.module';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    FetchDataModule.register({
      baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
