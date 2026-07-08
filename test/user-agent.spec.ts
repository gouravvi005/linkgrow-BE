import { describe, it, expect } from 'vitest';
import { parseUserAgent } from '@/common/utils/user-agent';

describe('User Agent Parser Utility', () => {
  it('should detect mobile device and safari browser', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1';
    const parsed = parseUserAgent(ua);

    expect(parsed.device).toBe('mobile');
    expect(parsed.browser).toBe('Safari');
    expect(parsed.os).toBe('iOS');
  });

  it('should detect desktop device and chrome browser on Windows', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
    const parsed = parseUserAgent(ua);

    expect(parsed.device).toBe('desktop');
    expect(parsed.browser).toBe('Chrome');
    expect(parsed.os).toBe('Windows');
  });

  it('should fallback to Unknown for empty/undefined values', () => {
    const parsed = parseUserAgent(undefined);

    expect(parsed.device).toBe('desktop');
    expect(parsed.browser).toBe('Unknown');
    expect(parsed.os).toBe('Unknown');
  });
});
