import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import * as fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { SynthesizeDto } from './dto/synthesize.dto';
import { SynthesizeResponseDto } from './dto/synthesize-response.dto';
import { ConfigService } from '@nestjs/config';
import { DeleteTTSResponseDto } from './dto/delete-tts-response.dto';

@Injectable()
export class TtsService {
  constructor(private readonly configService: ConfigService) {}

  async synthesizeText(args: SynthesizeDto): Promise<SynthesizeResponseDto> {
    const audioDir = join(process.cwd(), 'public', 'tts');
    if (!existsSync(audioDir)) {
      mkdirSync(audioDir, { recursive: true });
    }

    const key = crypto
      .createHash('sha256')
      .update(`${args.text}-${args.languageCode}-${args.gender}-${args.name}`)
      .digest('hex');

    const fileName = `${key}.mp3`;
    const filePath = join(audioDir, fileName);

    if (existsSync(filePath)) {
      return {
        url: fileName,
        fullUrl: `${this.configService.get('API_URL')}public/tts/${fileName}`,
      };
    }

    const res = await fetch(
      `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${this.configService.get('GOOGLE_API')}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: {
            text: args.text,
          },
          voice: {
            languageCode: args.languageCode,
            ssmlGender: args.gender,
            name: args.name,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.8,
          },
        }),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`TTS failed: ${errorText}`);
    }

    const data = await res.json();

    const bufferFile = Buffer.from(data.audioContent, 'base64');

    const path = `./public/tts/${fileName}`;

    await fs.writeFile(path, bufferFile);

    return {
      url: fileName,
      fullUrl: `${this.configService.get('API_URL')}public/tts/${fileName}`,
    };
  }

  async deleteSoundUrl(soundUrl: string): Promise<DeleteTTSResponseDto> {
    const path = `./public/tts/${soundUrl}`;
    if (existsSync(path)) {
      await fs.unlink(path);
    }

    return {
      message: 'TTS deleted successfully',
    };
  }
}
