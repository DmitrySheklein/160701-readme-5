import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PostContentValidator } from '@project/validation';

export class VideoPostContent extends BasePostContent {
  @ApiProperty({
    description: 'Video title',
    example: 'Lorem ipsum dolor sit amet. Suscipit, est?',
  })
  @Expose()
  @IsString()
  @MinLength(PostContentValidator.video.title.Min)
  @MaxLength(PostContentValidator.video.title.Max)
  title!: string;

  @ApiProperty({
    description: 'Valid url link',
    example: 'https://www.youtube.com/watch?v=JU79n3yU1aA',
  })
  @Expose()
  @Matches(PostContentValidator.video.url.Matches)
  url!: string;
}
