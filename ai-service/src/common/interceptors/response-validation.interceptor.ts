import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import type { ClassConstructor } from 'class-transformer';

@Injectable()
export class ResponseValidationInterceptor implements NestInterceptor {
  constructor(private readonly responseDto: ClassConstructor<object>) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      switchMap(async (data: unknown) => {
        const dtoInstance = plainToInstance(this.responseDto, data);

        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
          // eslint-disable-next-line no-console
          console.error('Response validation failed:', errors);
          throw new InternalServerErrorException(
            'Response validation failed: ' +
              errors
                .map((error) => Object.values(error.constraints || {}))
                .flat()
                .join(', '),
          );
        }

        return data;
      }),
    );
  }
}
