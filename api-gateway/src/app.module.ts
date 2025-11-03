import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { AiModule } from '././ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { FolderModule } from './folder/folder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: Buffer.from(
            configService.get<string>('JWT_SECRET') || '',
            'utf-8',
          ),
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
    AiModule,
    AuthModule,
    FolderModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy],
})
export class AppModule {}
