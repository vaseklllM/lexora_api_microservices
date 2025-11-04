import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new HttpErrorInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: false,
      exceptionFactory: (validationErrors) => {
        const messages: string[] = [];
        const errorsByField: Record<string, string[]> = {};
        const collectErrors = (errors: any[], parentPath?: string) => {
          for (const err of errors) {
            const propertyPath = parentPath
              ? `${parentPath}.${err.property}`
              : err.property;
            const constraints: string[] = err?.constraints
              ? Object.values(err.constraints)
              : [];
            if (constraints.length) {
              messages.push(...constraints);
              errorsByField[propertyPath] = constraints;
            }
            if (Array.isArray(err.children) && err.children.length > 0) {
              collectErrors(err.children, propertyPath);
            }
          }
        };
        collectErrors(validationErrors);
        return new BadRequestException({
          statusCode: 400,
          error: 'Bad Request',
          message: messages,
          errors: errorsByField,
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Lexora API')
    .setDescription('API documentation for Lexora application')
    .setVersion('0.1.0')
    .addBearerAuth()
    .addTag('Authentication', 'User authentication and registration operations')
    .addTag(
      'Folders',
      'Folder management operations for organizing decks and cards',
    )
    .addTag('Decks', 'Deck management operations for organizing cards')
    .addTag('Cards', 'Card management operations for organizing cards')
    .addTag('Languages', 'Language management operations')
    .addTag('AI', 'AI-powered translation and word analysis services')
    .addTag('Dashboard', 'Main page')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(configService.get<number>('PORT')!);
}

void bootstrap();
