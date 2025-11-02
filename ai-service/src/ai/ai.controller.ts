import { Controller, Get, Query } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth';
import { ValidateResponse } from 'src/common/decorators/validate-response.decorator';
import { FillCardDataResponseDto } from './dto/fill-card-data-response.dto';
import { FillCardDataDto } from './dto/fill-card-data.dto';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('fill-card-data')
  @Auth()
  @ValidateResponse(FillCardDataResponseDto)
  fillCardData(
    @Query() fillCardDataDto: FillCardDataDto,
  ): Promise<FillCardDataResponseDto> {
    return this.aiService.fillCardData(fillCardDataDto);
  }
}
