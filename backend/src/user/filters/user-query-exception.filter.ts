import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let message = 'Erro interno no servidor.';

    // Verifica violação de unicidade (e-mail duplicado)
    if ((exception as any).code === '23505') {
      message = 'E-mail já está em uso. Por favor, escolha outro.';
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
