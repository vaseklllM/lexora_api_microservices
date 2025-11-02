import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(process.env.JWT_SECRET as string, 'utf-8'),
    });
  }

  validate(payload: any) {
    return {
      jwt: {
        id: payload.jwtId,
        iat: payload.iat,
        exp: payload.exp,
      },
    };
  }
}
