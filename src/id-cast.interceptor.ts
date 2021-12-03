import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const idRegexp = /id$/i;
const idsRegexp = /Ids$/;

@Injectable()
export class IdCastInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const body = request.body;
    requestCasting(body);
    
    return next.handle().pipe(
      map((data) => {
        responseCasting(data);
        return data;
      }),
    );
  }
}

function requestCasting(data) {
  Object.keys(data).map((key) => {
    if(!data[key]) {
      return;
    }
    
    if (idRegexp.test(key)) {
      data[key] = parseInt(data[key]);
    } else if (idsRegexp.test(key)) {
      data[key] = data[key].map(id => parseInt(id));
    } else if (typeof data[key] === 'object' && Array.isArray(data[key])) {
      data[key].map((_data) => requestCasting(_data));
    } else if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      requestCasting(data[key]);
    }
  });
}

function responseCasting(data) {
  Object.keys(data).map((key) => {
    if(!data[key]) {
      return;
    }
    
    if (idRegexp.test(key)) {
      data[key] = `${data[key]}`;
    } else if (idsRegexp.test(key)) {
      data[key] = data[key].map(id => `${id}`);
    } else if (typeof data[key] === 'object' && Array.isArray(data[key])) {
      data[key].map((_data) => responseCasting(_data));
    } else if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      responseCasting(data[key]);
    }
  });
}
