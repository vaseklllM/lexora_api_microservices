import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Cefr } from 'src/common/enums/Cerf';

export class FillCardDataResponseDto {
  @ApiProperty({
    example: 'Книга',
    description: 'Text in known language',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  textInKnownLanguage: string;

  @ApiProperty({
    example: 'Book',
    description: 'Text in learning language',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  textInLearningLanguage: string;

  @ApiProperty({
    example: 'Книга - это хорошо',
    description: 'Description in known language',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  descriptionInKnownLanguage: string;

  @ApiProperty({
    example: 'Book is good',
    description: 'Description in learning language',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  descriptionInLearningLanguage: string;

  @ApiProperty({
    example: Cefr.A1,
    description: 'CEFR level',
    required: true,
  })
  @IsEnum(Cefr)
  @IsNotEmpty()
  cefr: Cefr;
}
