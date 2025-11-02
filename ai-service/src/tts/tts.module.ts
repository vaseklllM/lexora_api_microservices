import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { TtsController } from './tts.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [TtsService],
  exports: [TtsService],
  controllers: [TtsController],
})
export class TtsModule {}
