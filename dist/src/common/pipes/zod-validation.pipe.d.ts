import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodType } from 'zod';
export declare class ZodValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: ZodType<any>);
    transform(value: any, metadata: ArgumentMetadata): any;
}
