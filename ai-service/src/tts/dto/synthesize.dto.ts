import { IsNotEmpty, IsString } from 'class-validator';

export type Gender = 'male' | 'female';

export class SynthesizeDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  languageCode: string;

  @IsString()
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  name: string;
}
