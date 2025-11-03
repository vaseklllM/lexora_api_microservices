import { Injectable } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-response.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async login(user: LoginDto): Promise<LoginResponseDto> {
    const response = await firstValueFrom(
      this.httpService.post('auth/login', user),
    );
    return response.data;
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const response = await firstValueFrom(
      this.httpService.post('auth/register', registerDto),
    );

    return response.data;
  }

  // async googleLogin(googleLoginDto: GoogleLoginDto): Promise<LoginResponseDto> {
  //   const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  //   const ticket = await client.verifyIdToken({
  //     idToken: googleLoginDto.idToken,
  //     audience: process.env.GOOGLE_CLIENT_ID,
  //   });
  //   const payload = ticket.getPayload();

  //   if (!payload?.email) {
  //     throw new UnauthorizedException('Google account email not available');
  //   }

  //   if (payload.email_verified === false) {
  //     throw new UnauthorizedException('Google email is not verified');
  //   }

  //   if (
  //     googleLoginDto.email &&
  //     googleLoginDto.email.toLowerCase() !== payload.email.toLowerCase()
  //   ) {
  //     throw new UnauthorizedException('Email mismatch for Google login');
  //   }

  //   return await this.databaseService.$transaction(
  //     async (tx): Promise<LoginResponseDto> => {
  //       const user = await tx.user.findUnique({
  //         where: { email: payload.email },
  //         include: {
  //           accounts: true,
  //           language: true,
  //         },
  //       });

  //       if (!user) {
  //         const newUser = await tx.user.create({
  //           data: {
  //             email: payload.email!,
  //             name: payload.name!,
  //             avatar: payload.picture,
  //             accounts: {
  //               create: {
  //                 provider: AccountProvider.google,
  //                 type: AccountType.oauth,
  //                 providerAccountId: googleLoginDto.accountId,
  //               },
  //             },
  //           },
  //           include: {
  //             language: true,
  //           },
  //         });

  //         return {
  //           ...this.generateTokens(newUser),
  //           user: {
  //             id: newUser.id,
  //             email: newUser.email,
  //             name: newUser.name,
  //             createdAt: newUser.createdAt.toISOString(),
  //             updatedAt: newUser.updatedAt.toISOString(),
  //             avatar: newUser.avatar ?? undefined,
  //             language: this.languagesService.convertLanguageToLanguageDto(
  //               newUser.language,
  //             ),
  //           },
  //         };
  //       }

  //       if (!user.accounts.some((i) => i.provider === AccountProvider.google)) {
  //         await this.databaseService.account.create({
  //           data: {
  //             type: AccountType.oauth,
  //             provider: AccountProvider.google,
  //             providerAccountId: googleLoginDto.accountId,
  //             userId: user.id,
  //           },
  //         });
  //       }

  //       return {
  //         ...this.generateTokens(user),
  //         user: {
  //           id: user.id,
  //           email: user.email,
  //           name: user.name,
  //           createdAt: user.createdAt.toISOString(),
  //           updatedAt: user.updatedAt.toISOString(),
  //           avatar: user.avatar ?? undefined,
  //           language: this.languagesService.convertLanguageToLanguageDto(
  //             user.language,
  //           ),
  //         },
  //       };
  //     },
  //   );
  // }

  // async logout(currentUser: ICurrentUser): Promise<LogoutResponseDto> {
  //   const user = await this.databaseService.user.findUnique({
  //     where: { id: currentUser.id },
  //   });

  //   await this.redisService.setJwtLogout({
  //     sub: currentUser.id,
  //     jwtId: currentUser.jwt.id,
  //     exp: currentUser.jwt.exp,
  //     iat: currentUser.jwt.iat,
  //   });

  //   await this.redisService.setJwtRefresh({
  //     sub: currentUser.id,
  //     jwtId: currentUser.jwt.id,
  //     exp: currentUser.jwt.exp,
  //     iat: currentUser.jwt.iat,
  //   });

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return {
  //     message: 'Successfully logged out',
  //     loggedOutAt: new Date().toISOString(),
  //   };
  // }

  // async refresh(refreshDto: RefreshDto): Promise<RefreshResponseDto> {
  //   try {
  //     const jwtPayload: JwtPayload = await this.jwtService.verify(
  //       refreshDto.refreshToken,
  //       {
  //         secret: Buffer.from(
  //           process.env.JWT_REFRESH_SECRET as string,
  //           'utf-8',
  //         ),
  //       },
  //     );

  //     if (!jwtPayload) {
  //       throw new UnauthorizedException('Invalid refresh token');
  //     }

  //     const redisUserId = await this.redisService.getJwtRefresh(
  //       jwtPayload.jwtId,
  //     );

  //     if (redisUserId) {
  //       throw new UnauthorizedException();
  //     }

  //     await this.redisService.setJwtLogout(jwtPayload);
  //     await this.redisService.setJwtRefresh(jwtPayload);

  //     const user = await this.databaseService.user.findUnique({
  //       where: { id: jwtPayload.sub },
  //     });

  //     if (!user) {
  //       throw new UnauthorizedException('User not found');
  //     }

  //     return this.generateTokens(user);
  //   } catch (error) {
  //     if (error instanceof JsonWebTokenError) {
  //       throw new UnauthorizedException('Invalid refresh token');
  //     }
  //     throw error;
  //   }
  // }

  // async me(userId: string): Promise<UserDto> {
  //   const user = await this.databaseService.user.findUnique({
  //     where: { id: userId },
  //     include: {
  //       language: true,
  //     },
  //   });

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   return {
  //     id: user.id,
  //     email: user.email,
  //     name: user.name,
  //     createdAt: user.createdAt.toISOString(),
  //     updatedAt: user.updatedAt.toISOString(),
  //     avatar: user.avatar ?? undefined,
  //     language: this.languagesService.convertLanguageToLanguageDto(
  //       user.language,
  //     ),
  //   };
  // }
}
