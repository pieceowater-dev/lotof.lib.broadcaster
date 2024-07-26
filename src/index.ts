import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

export interface PCWTNestClientMicroservicePreset {
  port: number;
  microservices: Array<{
    transport: Transport;
    urls: string[];
    queue: string;
  }>;
}

export async function bootstrap(appModule: any, config: PCWTNestClientMicroservicePreset) {
  const app = await NestFactory.create(appModule);

  for (const svc of config.microservices) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: svc.transport,
      options: {
        urls: svc.urls,
        queue: svc.queue,
        queueOptions: {
          durable: false,
        },
      },
    } as MicroserviceOptions
    );
  }

  await app.startAllMicroservices();
  await app.listen(config.port, '127.0.0.1');
  console.log(`Application is running on: ${await app.getUrl()}`);
}