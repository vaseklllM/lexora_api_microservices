import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { ValidateResponse } from '../common/decorators/validate-response.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RegisterDto } from './dto/register.dto';
import { Auth } from 'src/common/decorators/auth';
import { LogoutResponseDto } from './dto/logout-response.dto';
import {
  CurrentUser,
  type ICurrentUser,
} from 'src/common/decorators/current-user.decorator';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { RefreshDto } from './dto/refresh.dto';
import { GoogleLoginDto } from './dto/google-login.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    description: 'Authenticates user and returns access token',
    type: JwtTokenDto,
  })
  @ValidateResponse(JwtTokenDto)
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User register' })
  @ApiOkResponse({
    description: 'Registers user and returns access token',
    type: RegisterResponseDto,
  })
  @ValidateResponse(RegisterResponseDto)
  register(@Body() registerDto: RegisterDto): Promise<RegisterResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  @Auth()
  @ApiOperation({ summary: 'User logout' })
  @ApiOkResponse({
    description: 'Logs out user and returns access token',
    type: LogoutResponseDto,
  })
  @ValidateResponse(LogoutResponseDto)
  logout(@CurrentUser() user: ICurrentUser): Promise<LogoutResponseDto> {
    return this.authService.logout(user);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({
    description: 'Refresh access token',
    type: RefreshResponseDto,
  })
  @ValidateResponse(RefreshResponseDto)
  refresh(@Body() refreshDto: RefreshDto): Promise<RefreshResponseDto> {
    return this.authService.refresh(refreshDto);
  }

  @Post('google')
  @ApiOperation({ summary: 'Google login' })
  @ApiOkResponse({
    description: 'Google login',
    type: LoginResponseDto,
  })
  @ValidateResponse(LoginResponseDto)
  googleLogin(
    @Body() googleLoginDto: GoogleLoginDto,
  ): Promise<LoginResponseDto> {
    return this.authService.googleLogin(googleLoginDto);
  }

  @Get('me')
  @Auth()
  @ApiOperation({ summary: 'Get current user info' })
  @ApiOkResponse({
    description: 'Returns current user info',
    type: UserDto,
  })
  @ValidateResponse(UserDto)
  me(@CurrentUser() user: ICurrentUser): Promise<UserDto> {
    return this.authService.me(user.accessToken);
  }
}
