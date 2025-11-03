import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTTSDto {
  @IsString()
  @IsNotEmpty()
  ttsUrl: string;
}
