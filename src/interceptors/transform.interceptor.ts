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
        //data에 값이 있을 때
        if (data) {
          //data가 배열 형식일 때
          if (Array.isArray(data)) {
            //빈 배열일 때
            if (data.length == 0)
              return {
                statusCode: statusCode,
                message: 'Success',
                data: { list: [] },
              };
            //배열에 값이 있을 때
            return {
              statusCode: statusCode,
              message: 'Success',
              data: { list: data },
            };
          }
          //data가 배열 형식이 아닐 때
          return { statusCode: statusCode, message: 'Success', data: data };
        }
        //data에 값이 없을 때
        else {
          return { statusCode: statusCode, message: 'Success', data: {} };
        }
      }),
    );
  }
}
