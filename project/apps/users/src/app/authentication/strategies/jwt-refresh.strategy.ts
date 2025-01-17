import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

import { AuthenticationService } from '../authentication.service';
import { jwtConfig } from '@project/config/users';
import { RefreshTokenPayload } from '@project/libs/shared/app/types';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly config: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    const { tokenId } = payload;

    if (!(await this.refreshTokenService.isExists(tokenId))) {
      throw new TokenNotExistsException(tokenId);
    }
    await this.refreshTokenService.deleteRefreshSession(tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUserById(payload.sub);
  }
}
