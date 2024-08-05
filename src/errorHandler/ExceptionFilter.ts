import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import {ServiceError} from "./ServiceError";
import {Observable, throwError} from "rxjs";

@Catch(ServiceError)
export class ExceptionFilter implements RpcExceptionFilter<ServiceError> {
  catch(exception: ServiceError, host: ArgumentsHost): Observable<any> {
    return throwError(() => exception);
  }
}
