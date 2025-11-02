import { Injectable } from '@nestjs/common';
import { FillCardDataResponseDto } from './dto/fill-card-data-response.dto';
import { FillCardDataDto } from './dto/fill-card-data.dto';
import { VertexProvider } from 'src/vertex/vertex';
import { SchemaType } from '@google-cloud/vertexai';
import { Cefr } from 'src/common/enums/Cerf';

@Injectable()
export class AiService {
  constructor(private readonly vertex: VertexProvider) {}

  async fillCardData(
    fillCardDataDto: FillCardDataDto,
  ): Promise<FillCardDataResponseDto> {
    const {
      word = '',
      languageWhatIKnowCode,
      languageWhatILearnCode,
    } = fillCardDataDto;

    const result = await this.vertex.generate<{
      term: string;
      cefr: Cefr;
      example: string;
      exampleTranslation: string;
      translations: string[];
    }>({
      prompt: `You are a CEFR-aligned dictionary assistant.

        Generate a JSON object that matches exactly the given schema for the word "${word}".
        - The word is in language: ${languageWhatILearnCode}.
        - IMPORTANT: 
          * the given term may contain spelling mistakes. Automatically correct the spelling and use the corrected form in the "term" field.
          * If the word cannot be recognized → return the closest valid word in ${languageWhatILearnCode}.
          * If the word is written in another language → translate it into ${languageWhatILearnCode} and use that as the "term".
        - The "translations" array must contain 2–5 good translations of "${word}" into language ${languageWhatIKnowCode}.
          * The first translation in the array must start with a capital letter.
          * The rest of the translations should be lowercase.
        - The "example" must be a simple sentence using "${word}" in ${languageWhatILearnCode}.
        - The "exampleTranslation" must be the translation of that example sentence into ${languageWhatIKnowCode}.
        - The "cefr" level must be one of: A1, A2, B1, B2, C1, C2.
        - The "term" field must be the corrected version of "${word}", and it must always start with a capital letter (e.g. "Dog" not "dog").

        Return **only JSON**, strictly following the schema.
        `,
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          term: { type: SchemaType.STRING },
          example: { type: SchemaType.STRING },
          exampleTranslation: { type: SchemaType.STRING },
          cefr: {
            type: SchemaType.STRING,
            enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
          },
          translations: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
        },
        required: [
          'term',
          'cefr',
          'example',
          'exampleTranslation',
          'translations',
        ],
      },
    });

    return {
      textInKnownLanguage: result.translations
        .map((translation) => translation)
        .join(', '),
      textInLearningLanguage: result.term,
      descriptionInKnownLanguage: result.exampleTranslation,
      descriptionInLearningLanguage: result.example,
      cefr: result.cefr,
    };
  }
}
