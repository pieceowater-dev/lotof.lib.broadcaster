import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, throwError, timeout } from 'rxjs';

export abstract class LotOfClientProxy extends ClientProxy {
  sendWithTimeout<TResult = any, TInput = any>(
    pattern: any,
    data: TInput,
    timeoutMs: number = 3000,
  ): Observable<TResult> {
    return super.send<TResult, TInput>(pattern, data).pipe(
      timeout(timeoutMs),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          console.error(`Timeout error: ${err.message}`);
        } else {
          console.error(`Error: ${err.message}`);
        }
        return throwError(() => new Error('Request timed out or failed'));
      }),
    );
  }
}
