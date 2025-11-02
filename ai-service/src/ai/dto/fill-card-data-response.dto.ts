import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Cefr } from 'src/common/enums/Cerf';

export class FillCardDataResponseDto {
  @IsString()
  @IsNotEmpty()
  textInKnownLanguage: string;

  @IsString()
  @IsNotEmpty()
  textInLearningLanguage: string;

  @IsString()
  @IsNotEmpty()
  descriptionInKnownLanguage: string;

  @IsString()
  @IsNotEmpty()
  descriptionInLearningLanguage: string;

  @IsEnum(Cefr)
  @IsNotEmpty()
  cefr: Cefr;
}
