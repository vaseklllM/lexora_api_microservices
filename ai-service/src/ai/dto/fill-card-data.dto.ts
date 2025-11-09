import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FillCardDataDto {
  @ApiProperty({
    example: 'Книга',
    description: 'Word',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  word: string;

  @ApiProperty({
    description: 'Language code of the known language',
    example: 'en-US',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  languageWhatIKnowCode: string;

  @ApiProperty({
    description: 'Language code of the learning language',
    example: 'de-DE',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  languageWhatILearnCode: string;
}
