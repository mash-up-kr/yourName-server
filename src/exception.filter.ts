import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getResponse()['status']
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errMsg =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    response.status(status).json({
      code: status,
      data: {},
      message: errMsg,
    });
  }
}
