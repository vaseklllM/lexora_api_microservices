import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/public', express.static(join(process.cwd(), 'public')));

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
    .setTitle('AI Service')
    .setDescription('API documentation for AI Service')
    .setVersion('1.0')
    .addTag('AI', 'AI-powered translation and word analysis services')
    .addTag('TTS', 'Text-to-Speech services')
    .build();

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, config),
  );

  await app.listen(process.env.PORT ?? 4001);
}

void bootstrap();
