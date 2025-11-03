import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTTSResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}
