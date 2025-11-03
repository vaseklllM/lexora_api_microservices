import { Injectable } from '@nestjs/common';
import { FillCardDataResponseDto } from './dto/fill-card-data-response.dto';
import { FillCardDataDto } from './dto/fill-card-data.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async fillCardData(
    accessToken: string,
    fillCardDataDto: FillCardDataDto,
  ): Promise<FillCardDataResponseDto> {
    const response = await firstValueFrom(
      this.httpService.get<FillCardDataResponseDto>('ai/fill-card-data', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: fillCardDataDto,
      }),
    );

    return response.data;
  }
}
