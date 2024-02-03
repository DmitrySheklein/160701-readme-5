import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from './authentication.constants';
import { User } from '@project/validation';

export class CreateUserBaseDto {
  @ApiProperty({
    description: 'User unique email address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
    minLength: User.firstname.Min,
    maxLength: User.firstname.Max,
  })
  @MinLength(User.firstname.Min)
  @MaxLength(User.firstname.Max)
  @IsString()
  public firstname!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
    minLength: User.password.Min,
    maxLength: User.password.Max,
  })
  @MinLength(User.password.Min)
  @MaxLength(User.password.Max)
  @IsString()
  public password!: string;
}

export class CreateUserDto extends CreateUserBaseDto {
  @ApiProperty({
    required: false,
    description: 'User img avatar ID',
    example: '65a8be2bf72eba2b50420cf7',
  })
  public avatarId?: string;
}

export class CreateUserDtoWithAvatarFile extends CreateUserBaseDto {
  @ApiProperty({
    required: false,
    description: 'User profile picture PNG or JPG file',
    type: 'string',
    format: 'binary',
    enum: ['image/png', 'image/jpeg'],
    maxLength: 100,
  })
  public avatar?: any;
}
