import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

type MessageWithMeta = object & { meta: { timestamp: number, timeout: number } }

export class ServiceTimeoutPipe implements PipeTransform<MessageWithMeta, MessageWithMeta> {
  transform(value: MessageWithMeta, metadata: ArgumentMetadata) {
    if(value.meta.timestamp + value.meta.timeout < Date.now()){
      throw new BadRequestException('Timeout');
    }

    return value
  }
}
