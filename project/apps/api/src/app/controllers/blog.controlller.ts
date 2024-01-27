import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AxiosExceptionFilter } from '../filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { CreatePostDto } from '../dto/create-post.dto';
import { CheckAuthGuard } from '../guards/check-auth.guard';
import { UserIdInterceptor } from '../interceptors/userid.interceptor';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/`,
      dto
    );
    return data;
  }
}
