import { describe, it, expect } from 'vitest';
import { getSecondsUntilUTCMidnight, getSecondsUntilMidnightInTimezone } from '@/utils/time';

describe('RadarChart timezone boundaries', () => {
  it('returns a valid UTC countdown', () => {
    const seconds = getSecondsUntilUTCMidnight();

    expect(seconds).toBeGreaterThanOrEqual(0);
    expect(seconds).toBeLessThanOrEqual(86400);
  });

  it('supports UTC timezone', () => {
    const seconds = getSecondsUntilMidnightInTimezone('UTC');

    expect(seconds).toBeGreaterThanOrEqual(0);
    expect(seconds).toBeLessThanOrEqual(86400);
  });

  it('supports America/New_York timezone', () => {
    const seconds = getSecondsUntilMidnightInTimezone('America/New_York');

    expect(seconds).toBeGreaterThanOrEqual(0);
    expect(seconds).toBeLessThanOrEqual(86400);
  });

  it('supports Asia/Kolkata timezone', () => {
    const seconds = getSecondsUntilMidnightInTimezone('Asia/Kolkata');

    expect(seconds).toBeGreaterThanOrEqual(0);
    expect(seconds).toBeLessThanOrEqual(86400);
  });

  it('supports Asia/Tokyo timezone', () => {
    const seconds = getSecondsUntilMidnightInTimezone('Asia/Tokyo');

    expect(seconds).toBeGreaterThanOrEqual(0);
    expect(seconds).toBeLessThanOrEqual(86400);
  });
});
