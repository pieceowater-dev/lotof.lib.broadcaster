import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

export interface PCWTNestClientMicroservicePreset {
  portEnvVar: string;
  microservices: Array<{
    transport: Transport;
    urlEnvVars: string[];
    queue: string;
  }>;
}

export async function bootstrap(appModule: any, config: PCWTNestClientMicroservicePreset): Promise<boolean> {
  const app = await NestFactory.create(appModule);
  const configService = app.get(ConfigService);

  // noinspection TypeScriptValidateTypes
  const port = configService.get<number>(config.portEnvVar) || 3000;

  for (const svc of config.microservices) {
    const urls = svc.urlEnvVars.map((envUrl) => {
      // noinspection TypeScriptValidateTypes
      return configService.get<string>(envUrl);
    })

    app.connectMicroservice<MicroserviceOptions>({
      transport: svc.transport,
      options: {
        urls: urls,
        queue: svc.queue,
        queueOptions: {
          durable: false,
        },
      },
    } as MicroserviceOptions
    );
  }

  await app.startAllMicroservices();
  await app.listen(port, '127.0.0.1');
  console.log(`Application is running on: ${await app.getUrl()}`);
  return true
}