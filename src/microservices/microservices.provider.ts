import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, throwError, timeout } from 'rxjs';
import {ServiceError} from "../errorHandler";

/**
 * Abstract class that provides a method to send messages to a microservice with a timeout mechanism.
 * Extend this class to create services that communicate with microservices.
 */
@Injectable()
export abstract class MicroservicesProvider {
  /**
   * Constructor to inject the ClientProxy.
   * @param client - The ClientProxy instance used to send messages to a microservice.
   */
  protected constructor(protected client: ClientProxy) {}

  /**
   * Sends a message to a microservice with a specified timeout.
   * @param pattern - The pattern to identify the message handler.
   * @param data - The data to send to the microservice.
   * @param timeoutMs - The timeout in milliseconds. Default is 3000.
   * @param log - Boolean, log data that sent
   * @returns An Observable that emits the result of the message or an error if the request times out or fails.
   */
  sendWithTimeout<TResult, TInput>(
    pattern: any,
    data: TInput,
    timeoutMs: number = 3000,
    log: boolean = false,
  ) {
    const enhancedData = {
      ...data,
      meta: {
        timeout: timeoutMs,
        timestamp: Math.floor(Date.now() / 1000),
      },
    };

    if (log) {
      console.log(
        `Sending message with pattern: "${pattern}" and data: ${JSON.stringify(enhancedData)}`,
      );
    }

    return this.client.send<TResult, TInput>(pattern, enhancedData).pipe(
      timeout(timeoutMs),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          console.error(`Timeout error: ${err.message}`);
          return throwError(() => new Error('Request timed out'));
        } else if(err.name === ServiceError.name) {
          return throwError(() => new Error(err.message));
        } else {
          return throwError(() => new Error('Request failed'));
        }
      }),
    );
  }
}
