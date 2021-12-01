import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const idRegexp = /Id$/;

@Injectable()
export class IdCastInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const query = context.switchToHttp().getRequest().query;
    const body = context.switchToHttp().getRequest().body;

    Object.keys(query).map((key) => {
      if (key === 'id' || idRegexp.test(key)) query[key] = parseInt(query[key]);
    });
    Object.keys(body).map((key) => {
      if (key === 'id' || idRegexp.test(key)) body[key] = parseInt(body[key]);
    });

    return next.handle().pipe(
      map((data) => {
        castId(data);
        return data;
      }),
    );
  }
}

function castId(data) {
  Object.keys(data).map((key) => {
    if (key === 'id' || idRegexp.test(key)) {
      data[key] = `${data[key]}`;
    } else if (typeof data[key] === 'object' && Array.isArray(data[key])) {
      data[key].map((_data) => castId(_data));
    } else if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      castId(data[key]);
    }
  });
}
