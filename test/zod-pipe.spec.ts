import { describe, it, expect } from 'vitest';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import { z } from 'zod';

describe('Zod Validation Pipe', () => {
  const schema = z.object({
    username: z.string().min(3),
    age: z.number().int().positive(),
  });

  const pipe = new ZodValidationPipe(schema);

  it('should pass and return parsed data for valid input', () => {
    const data = { username: 'testuser', age: 25 };
    const parsed = pipe.transform(data, { type: 'body' });
    expect(parsed).toEqual(data);
  });

  it('should throw ZodError for invalid schema inputs', () => {
    const invalidData = { username: 'us', age: -5 };
    expect(() => pipe.transform(invalidData, { type: 'body' })).toThrow();
  });

  it('should skip validation for non-body types', () => {
    const rawData = { age: 'not-a-number' };
    const result = pipe.transform(rawData, { type: 'custom' as any });
    expect(result).toBe(rawData);
  });
});
