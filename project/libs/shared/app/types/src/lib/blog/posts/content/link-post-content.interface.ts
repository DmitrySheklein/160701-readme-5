import { Expose } from 'class-transformer';
import { BasePostContent } from './post-content.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsUrl } from 'class-validator';
import { PostContentValidator } from '@project/validation';

export class LinkPostContent extends BasePostContent {
  @ApiProperty({
    description: 'Valid url link',
    example: 'https://link.com/acaca',
  })
  @Expose()
  @IsUrl()
  @IsString()
  url!: string;

  @ApiProperty({
    description: 'Text',
    example: 'Lorem ipsum',
  })
  @Expose()
  @IsString()
  @MinLength(PostContentValidator.link.description.Min)
  @MaxLength(PostContentValidator.link.description.Max)
  description!: string;
}
