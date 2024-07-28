import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

/**
 * Interface representing the configuration preset for PCWT Nest Client Microservice.
 *
 * @interface PCWTNestClientMicroservicePreset
 * @property {string} portEnvVar - The environment variable for the port. Default is 'PORT'.
 * @property {Array<{transport: Transport, urlEnvVars: string[], queue: string}>} microservices - The microservices configuration array.
 */
export interface PCWTNestClientMicroservicePreset {
  portEnvVar: string | 'PORT';
  microservices: Array<{
    transport: Transport;
    urlEnvVars: string[] | ['MQ_URL'];
    queue: string;
  }>;
}


/**
 * Bootstraps the NestJS application with the given module and configuration preset.
 *
 * @param {any} appModule - The root module of the NestJS application.
 * @param {PCWTNestClientMicroservicePreset} config - The configuration preset for the microservices.
 * @returns {Promise<boolean>} - Returns a promise that resolves to true when the application is successfully started.
 */
export async function bootstrap(appModule: any, config: PCWTNestClientMicroservicePreset): Promise<boolean> {
  const app = await NestFactory.create(appModule);
  const configService = app.get(ConfigService);

  // Retrieve the port from the environment variable or use the default value (3000)
  // noinspection TypeScriptValidateTypes
  const port = configService.get<number>(config.portEnvVar) || 3000;

  // Iterate through each microservice configuration
  for (const svc of config.microservices) {
    const urls = svc.urlEnvVars.map((envUrl) => {
      // Retrieve each URL from the environment variables
      // noinspection TypeScriptValidateTypes
      return configService.get<string>(envUrl);
    });

    // Connect the microservice with the provided options
    app.connectMicroservice<MicroserviceOptions>({
      transport: svc.transport,
      options: {
        urls: urls,
        queue: svc.queue,
        queueOptions: {
          durable: false,
        },
      },
    } as MicroserviceOptions);
  }

  // Start all microservices and listen on the specified port and host
  await app.startAllMicroservices();
  await app.listen(port, '127.0.0.1');

  // Log the application URL
  console.log(`Application is running on: ${await app.getUrl()}`);
  return true;
}
