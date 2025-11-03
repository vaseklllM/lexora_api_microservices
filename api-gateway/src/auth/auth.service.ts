import { Injectable } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-response.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { ICurrentUser } from 'src/common/decorators/current-user.decorator';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { UserDto } from './dto/user.dto';

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

  async logout(currentUser: ICurrentUser): Promise<LogoutResponseDto> {
    const response = await firstValueFrom(
      this.httpService.post(
        'auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}`,
          },
        },
      ),
    );

    return response.data;
  }

  async refresh(refreshDto: RefreshDto): Promise<RefreshResponseDto> {
    const response = await firstValueFrom(
      this.httpService.post('auth/refresh', refreshDto),
    );

    return response.data;
  }

  async googleLogin(googleLoginDto: GoogleLoginDto): Promise<LoginResponseDto> {
    const response = await firstValueFrom(
      this.httpService.post('auth/google', googleLoginDto),
    );

    return response.data;
  }

  async me(accessToken: string): Promise<UserDto> {
    const response = await firstValueFrom(
      this.httpService.get('auth/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return response.data;
  }
}
