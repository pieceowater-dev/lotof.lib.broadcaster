# lotof.lib.broadcaster
`@pieceowater-dev/lotof.lib.broadcaster` is a broadcasting library designed to facilitate communication within applications. 📢📡

## Installation

You can install the library via npm: 📥

```sh
npm install @pieceowater-dev/lotof.lib.broadcaster
```

## Usage example

NestJS Microservice bootstrap

```typescript
// src/main.ts
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { bootstrap } from '@pieceowater-dev/lotof.lib.broadcaster';

bootstrap(AppModule, {
  portEnvVar: 'PORT',
  microservices: [
    {
      transport: Transport.RMQ,
      urlEnvVars: ['RABBITMQ_URL'],
      queue: 'template_queue',
    },
  ],
}).then((r) => console.log('Booted successfully 🚀'));
```

Make sure to include the library in your project dependencies to start using its broadcasting capabilities. 🚀

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
![PCWT Dev Logo](https://avatars.githubusercontent.com/u/168465239?s=40)
### [PCWT Dev](https://github.com/pieceowater-dev)

