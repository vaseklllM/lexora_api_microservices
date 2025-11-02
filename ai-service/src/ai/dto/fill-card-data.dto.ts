import { IsNotEmpty, IsString } from 'class-validator';

export class FillCardDataDto {
  @IsString()
  @IsNotEmpty()
  word?: string;

  @IsString()
  @IsNotEmpty()
  languageWhatIKnowCode: string;

  @IsString()
  @IsNotEmpty()
  languageWhatILearnCode: string;
}
