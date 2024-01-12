import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto, generateSchemeApiError } from '@project/shared/helpers';
import { LikeRdo } from './rdo/like.rdo';

@ApiTags('likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiResponse({
    isArray: true,
    type: LikeRdo,
    description: 'Get all likes',
    status: HttpStatus.OK,
  })
  @Get('/')
  public async getAll() {
    const likes = await this.likesService.getAll();

    return likes;
  }

  @ApiResponse({
    type: LikeRdo,
    description: 'Create like',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    schema: generateSchemeApiError('Like exists', HttpStatus.CONFLICT),
    description: 'Like exists',
    status: HttpStatus.CONFLICT,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: String,
  })
  @Post('/create/:postId')
  public async create(
    @Param('postId') postId: string,
    @Query('userId') userId: string
  ) {
    const like = await this.likesService.createLike({
      postId,
      userId,
    });

    return fillDto(LikeRdo, like.toPOJO());
  }

  @ApiResponse({
    description: 'Like deleted successfully',
    status: HttpStatus.OK,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: String,
  })
  @Delete('/delete/:postId')
  public async delete(
    @Param('postId') postId: string,
    @Query('userId') userId: string
  ) {
    await this.likesService.deleteLike({
      postId,
      userId,
    });
  }

  @ApiResponse({
    isArray: true,
    type: LikeRdo,
    description: 'Get all likes by postId',
    status: HttpStatus.OK,
  })
  @ApiParam({
    name: 'postId',
    required: true,
    description: 'Should be an id of a post that exists in the database',
    type: String,
  })
  @Get(':postId')
  public async getCount(@Param('postId') postId: string) {
    const likes = await this.likesService.getLikes(postId);

    return fillDto(
      LikeRdo,
      likes.map((like) => like.toPOJO())
    );
  }
}
