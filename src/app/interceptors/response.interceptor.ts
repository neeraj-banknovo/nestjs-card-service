import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError, } from 'rxjs';
import { catchError, map, } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  statusCode: number;
  data?: T;
  message?: string;
}

@Injectable()
export class ResponseTransformInterceptor<T>
implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    /*
       This block will be called before request comes.
       This intercepts the incoming request
     */

    return next.handle().pipe(
      map((data) => ({ data, ...{ statusCode: HttpStatus.OK, success: true, }, })),
      catchError((err) => throwError(this.handleResponseExceptions(err)))
    );
  }

  private handleResponseExceptions(err: HttpException) {
    // handle the exception response here
    return err;
  }
}
