import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType<any>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // We only validate body, query, and params using this pipe
    if (metadata.type !== 'body' && metadata.type !== 'query' && metadata.type !== 'param') {
      return value;
    }
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }
}
