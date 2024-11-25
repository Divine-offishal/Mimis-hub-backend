import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: T) => {
        return {
          message: 'Data fetched successfully',
          statusCode: context.switchToHttp().getResponse().statusCode,
          data,
        };
      }),
    );
  }
}
