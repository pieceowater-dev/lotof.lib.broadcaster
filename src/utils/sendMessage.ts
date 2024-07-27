import {ClientProxy} from "@nestjs/microservices";
import { catchError, Observable, throwError, timeout } from 'rxjs';

/**
 * Sends a message to a microservice using a specified pattern and data.
 *
 * @template T - The expected response type from the microservice.
 * @template K - The type of the data being sent to the microservice.
 *
 * @param {ClientProxy} client - The ClientProxy instance used to communicate with the microservice.
 * @param {string} [pattern='ping'] - The pattern used to identify the message route in the microservice.
 * @param {K} data - The data to send to the microservice.
 * @param {boolean} [log=false] - Flag to enable logging of the message details.
 * @param {number} [timeoutMs=3000] - The timeout duration in milliseconds for the request.
 *
 * @returns {Observable<T>} - An observable that emits the response from the microservice.
 *
 * @example
 * ```
 * const client: ClientProxy = ...;
 * const data = { key: 'value' };
 * sendMessageToService(client, 'customPattern', data, true, 5000)
 *   .subscribe(response => {
 *     console.log('Response:', response);
 *   }, error => {
 *     console.error('Error:', error);
 *   });
 * ```
 */
export function sendMessageToService<T, K>(
  client: ClientProxy,
  pattern: string = 'ping',
  data: K,
  log: boolean = false,
  timeoutMs: number = 3000,
): Observable<T> {
  if (log) {
    console.log(
      `Sending message with pattern: "${pattern}" and data: ${JSON.stringify(data)}`,
    );
  }

  return client.send<T, K>(pattern, data).pipe(
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