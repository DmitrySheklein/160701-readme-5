import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.config';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './controllers/blog.controlller';
import { FileVaultController } from './controllers/file-vault.controllers';
import { UsersController } from './controllers/users.controller';
import { ApiService } from './services/api-service.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [BlogController, FileVaultController, UsersController],
  providers: [CheckAuthGuard, ApiService],
})
export class AppModule {}
