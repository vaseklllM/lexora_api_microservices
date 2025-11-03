import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TtsService {
  constructor(private readonly httpService: HttpService) {}

  async synthesizeText(args: {
    accessToken: string;
    text: string;
    languageCode: string;
    gender: 'male' | 'female';
    name: string;
  }): Promise<string> {
    const { accessToken, ...restData } = args;

    const response = await firstValueFrom(
      this.httpService.post<{ url: string; fullUrl: string }>(
        'tts/synthesize',
        restData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      ),
    );

    return response.data.url;
  }

  async deleteSoundUrl(soundUrl: string): Promise<void> {
    const path = `./public/tts/${soundUrl}`;
    if (existsSync(path)) {
      await fs.unlink(path);
    }
  }
}
