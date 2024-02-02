import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
  AllPostContentArray,
  PostContent,
  PostType,
  RefPostContentArray,
} from '@project/libs/shared/app/types';
import { Post } from '@project/validation';

import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

@ApiExtraModels(...AllPostContentArray)
export class CreatePostDto {
  @ApiProperty({
    enum: PostType,
    description: 'Post type',
    example: PostType.Video,
  })
  @IsEnum(PostType)
  public type!: PostType;

  @ApiProperty({
    description: 'Post hash tags',
    example: ['hash'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(Post.tags.MaxSize)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @MinLength(Post.tags.MinLength, { each: true })
  @MaxLength(Post.tags.MaxLength, { each: true })
  @Matches(Post.tags.Matches, {
    each: true,
    message:
      'tag must start with a letter and can only contain letters, numbers, underscores and pound.',
  })
  public tags!: string[];

  @ApiProperty({
    description: 'Post content by type',
    oneOf: RefPostContentArray,
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ValidateNested()
  public content!: PostContent;
}
