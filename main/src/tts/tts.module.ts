import { Module } from '@nestjs/common';
import { TtsService } from './tts.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule.register({ baseURL: process.env.SERVICE_AI_URL })],
  providers: [TtsService],
  exports: [TtsService],
})
export class TtsModule {}
