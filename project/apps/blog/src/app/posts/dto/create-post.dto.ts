import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from '@project/dto';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostWithAuthorDto extends CreatePostDto {
  @ApiProperty({
    description: 'Author id',
    example: '65b809b8d6443b043b33eedb',
  })
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  public author!: string;
}
