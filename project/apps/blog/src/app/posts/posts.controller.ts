import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create/create-post.dto';
import { UpdatePostDto } from './dto/update/update-post.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/shared/helpers';
import { PostRdo } from './rdo/post.rdo';
import { PostType } from '@project/libs/shared/app/types';
import { CreateVideoPostDto } from './dto/create/create-video-post.dto';
import { PostTypesRdo } from './rdo/post-types.rdo';
import { VideoPostRdo } from './rdo/video-post.rdo';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post create successfully',
  })
  @ApiOperation({
    summary: 'Создать пост с видео',
  })
  @Post(`/${PostType.Video}`)
  public async createVideo(@Body() createPostDto: CreateVideoPostDto) {
    const post = await this.postsService.create(PostType.Video, createPostDto);

    return fillDto(VideoPostRdo, post.toPOJO());
  }

  @ApiOperation({
    summary: 'Получить все посты',
  })
  @Get()
  public async findAll() {
    return this.postsService.findAll();
  }

  @ApiResponse({
    type: PostTypesRdo,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'Получить типы всех постов',
  })
  @Get('types')
  public async postTypesAll() {
    const types = await this.postsService.postTypesAll();

    return fillDto(PostTypesRdo, { data: types });
  }

  @ApiOperation({
    summary: 'Получить пост по id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(id, updatePostDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
