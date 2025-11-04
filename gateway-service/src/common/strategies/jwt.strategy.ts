import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(
        configService.get<string>('JWT_SECRET') || '',
        'utf-8',
      ),
      passReqToCallback: true,
    });
  }

  validate(request: any, payload: any) {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    return {
      accessToken,
      jwt: {
        id: payload.jwtId,
        iat: payload.iat,
        exp: payload.exp,
      },
    };
  }
}
