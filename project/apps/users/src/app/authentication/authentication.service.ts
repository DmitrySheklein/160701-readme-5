import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { AuthUser, User, UserRole } from '@project/libs/shared/app/types';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { JwtService } from '@nestjs/jwt';
import { JWT_ACCESS_KEY, JWT_REFRESH_KEY } from '@project/config/users';
import { createJWTPayload } from '@project/shared/helpers';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import * as crypto from 'node:crypto';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG,
  OLD_PASSWORD_NOT_CORRECT,
  CreateUserDto,
  LoginUserDto,
  ChangePasswordDto,
} from '@project/dto';
import { HashService } from '../hash/hash.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    @Inject(JWT_ACCESS_KEY)
    private readonly jwtAccessService: JwtService,
    @Inject(JWT_REFRESH_KEY)
    private readonly jwtRefreshService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly hashService: HashService
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, firstname, password, avatarId } = dto;
    const passwordHash = await this.hashService.generatePasswordHash(password);
    const blogUser: AuthUser = {
      email,
      firstname,
      avatar: avatarId,
      role: UserRole.User,
      passwordHash,
    };
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = new BlogUserEntity(blogUser);

    return this.blogUserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG);
    }

    const isEqualPassword = await this.hashService.comparePassword({
      password,
      passwordHash: existUser.passwordHash,
    });

    if (!isEqualPassword) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserById(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existUser;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with id ${email} not found`);
    }
    return existUser;
  }

  public async changePassword(id: string, dto: ChangePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const existUser = await this.getUserById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const isOldPasswordCorrect = await this.hashService.comparePassword({
      password: oldPassword,
      passwordHash: existUser.passwordHash,
    });

    if (!isOldPasswordCorrect) {
      throw new BadRequestException(OLD_PASSWORD_NOT_CORRECT);
    }

    const passwordHash = await this.hashService.generatePasswordHash(
      newPassword
    );
    const newUser = existUser.setPasswordHash(passwordHash);

    await this.blogUserRepository.update(id, newUser);

    return newUser;
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtAccessService.signAsync(
        accessTokenPayload
      );
      const refreshToken = await this.jwtRefreshService.signAsync(
        refreshTokenPayload
      );

      return { accessToken, refreshToken };
    } catch (error: any) {
      this.logger.error('[Token generation error]: ' + error.message);

      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
