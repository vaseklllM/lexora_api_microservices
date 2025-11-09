import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SynthesizeResponseDto {
  @ApiProperty({
    type: String,
    example:
      '9cdd313d60475ae5dd4bcc4779761148e3c3b868bb5b9a46e7868da0c7931145.mp3',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: String,
    example: `${process.env.API_URL}public/tts/9cdd313d60475ae5dd4bcc4779761148e3c3b868bb5b9a46e7868da0c7931145.mp3`,
  })
  @IsString()
  @IsNotEmpty()
  fullUrl: string;
}
