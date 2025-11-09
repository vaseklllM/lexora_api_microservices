import { plainToInstance } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  validateSync,
  IsUrl,
  Min,
  Max,
} from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  @Min(1)
  @Max(65535)
  PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  AI_SERVICE: string;

  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  AUTH_SERVICE: string;

  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  FOLDER_SERVICE: string;

  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  LANGUAGES_SERVICE: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => {
        const constraints = error.constraints
          ? Object.values(error.constraints)
          : [];
        return `${error.property}: ${constraints.join(', ')}`;
      })
      .join('\n');

    throw new Error(`❌ Environment validation failed:\n${errorMessages}`);
  }

  return validatedConfig;
}
