import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { VertexModule } from './vertex/vertex.module';
import { AiModule } from './ai/ai.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { TtsModule } from './tts/tts.module';
import { validate } from './common/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JwtModule.register({
      secret: Buffer.from(process.env.JWT_SECRET as string, 'utf-8'),
      signOptions: { expiresIn: '1h' },
    }),
    AiModule,
    TtsModule,
    VertexModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy],
})
export class AppModule {}
