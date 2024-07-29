import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError, timeout } from 'rxjs';

/**
 * extends this class
 * */
@Injectable()
export abstract class MicroservicesProvider {
  protected constructor(private client: ClientProxy) {}

  sendWithTimeout<TResult, TInput>(
    pattern: any,
    data: TInput,
    timeoutMs: number = 3000,
  ) {
    return this.client.send<TResult, TInput>(pattern, data).pipe(
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
