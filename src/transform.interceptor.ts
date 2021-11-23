import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  data: T;
  message: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const statusCode: number = context.getArgs()[1].statusCode;

    return next
      .handle()
      .pipe(
        map((data) =>
          data
            ? { code: statusCode, message: 'Success', data: data }
            : { code: statusCode, message: 'Success', data: {} },
        ),
      );
  }
}
