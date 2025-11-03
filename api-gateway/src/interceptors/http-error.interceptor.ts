import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: AxiosError) => {
        if (error.response) {
          return throwError(
            () =>
              new HttpException(
                error.response?.data as object,
                error.response?.status as number,
              ),
          );
        }

        return throwError(
          () =>
            new HttpException(
              'Service unavailable',
              HttpStatus.SERVICE_UNAVAILABLE,
            ),
        );
      }),
    );
  }
}
