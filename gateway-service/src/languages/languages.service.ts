import { Injectable } from '@nestjs/common';
import { LanguagesResponseDto } from './dto/languages-response.dto';
import { GetMyLanguagesResponseDto } from './dto/get-my-languages-response.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LanguagesService {
  constructor(private readonly httpService: HttpService) {}

  async all(): Promise<LanguagesResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get(`languages/all`),
    );

    return response.data;
  }

  async my(accessToken: string): Promise<GetMyLanguagesResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get(`languages/my`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    );

    return response.data;
  }
}
