import { Injectable } from '@nestjs/common';
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

  async deleteSoundUrl(accessToken: string, soundUrl: string): Promise<void> {
    await firstValueFrom(
      this.httpService.delete<{ url: string; fullUrl: string }>('tts/delete', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          ttsUrl: soundUrl,
        },
      }),
    );
  }
}
