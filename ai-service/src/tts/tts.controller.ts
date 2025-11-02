import { Body, Controller, Post } from '@nestjs/common';
import { TtsService } from './tts.service';
import { Auth } from 'src/common/decorators/auth';
import { ValidateResponse } from 'src/common/decorators/validate-response.decorator';
import { SynthesizeDto } from './dto/synthesize.dto';
import { SynthesizeResponseDto } from './dto/synthesize-response.dto';

@Controller('tts')
export class TtsController {
  constructor(private readonly ttsService: TtsService) {}

  @Post('synthesize')
  @Auth()
  @ValidateResponse(SynthesizeResponseDto)
  synthesize(
    @Body() synthesizeDto: SynthesizeDto,
  ): Promise<SynthesizeResponseDto> {
    return this.ttsService.synthesizeText(synthesizeDto);
  }
}
