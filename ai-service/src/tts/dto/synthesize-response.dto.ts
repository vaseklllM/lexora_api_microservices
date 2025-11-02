import { IsNotEmpty, IsString } from 'class-validator';

export class SynthesizeResponseDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  fullUrl: string;
}
