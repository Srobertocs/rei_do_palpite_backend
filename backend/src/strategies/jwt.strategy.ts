import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { env } from 'prisma/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env('JWT_SECRETS'),
    });
  }

  validate(payload: { sub: string; email: string }) {
    if (!payload) {
      throw new UnauthorizedException(
        'O usuário não possui autorização para isso',
      );
    }
    return { id: payload.sub, email: payload.email };
  }
}
