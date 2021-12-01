import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
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

    return next.handle().pipe(
      map((data) => {
        if (data) {
          if (data.length >= 0) {
            if (data.length == 0)
              return {
                statusCode: statusCode,
                message: 'Success',
                data: { list: [] },
              };
            return {
              statusCode: statusCode,
              message: 'Success',
              data: { list: data },
            };
          }
          return { statusCode: statusCode, message: 'Success', data: data };
        } else {
          return { statusCode: statusCode, message: 'Success', data: {} };
        }
      }),
    );
  }
}
