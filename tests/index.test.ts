import { TokenBucket } from '../src/TokenBucket';

describe('Token Bucket Rate Limiter', () => {
  let rateLimiter: TokenBucket;

  beforeEach(() => {
    jest.useFakeTimers();
    rateLimiter = new TokenBucket(10, 1); // 10 tokens, 1 token/second refill rate
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should allow consuming tokens when available', () => {
    expect(rateLimiter.tryConsume()).toBe(true);
    expect(rateLimiter.getAvailableTokens()).toBe(9);
  });

  test('should not allow consuming more tokens than available', () => {
    expect(rateLimiter.tryConsume(11)).toBe(false);
    expect(rateLimiter.getAvailableTokens()).toBe(10);
  });

  test('should refill tokens over time', () => {
    rateLimiter.tryConsume(10); // Consume all tokens
    expect(rateLimiter.getAvailableTokens()).toBe(0);

    jest.advanceTimersByTime(1500); // Advance time by 1.5 seconds

    expect(rateLimiter.getAvailableTokens()).toBeCloseTo(1.5, 1);
  });

  test('should not exceed max tokens when refilling', () => {
    jest.advanceTimersByTime(2000);

    expect(rateLimiter.getAvailableTokens()).toBe(10);
  });

  test('should allow consuming multiple tokens', () => {
    expect(rateLimiter.tryConsume(5)).toBe(true);
    expect(rateLimiter.getAvailableTokens()).toBe(5);
  });

  test('should refill tokens over time', () => {
    rateLimiter.tryConsume(10); // Consume all tokens

    for (let i = 1; i <= 10; i++) {
      jest.advanceTimersByTime(1000);
      expect(rateLimiter.getAvailableTokens()).toBeCloseTo(i, 1);
    }
  });

  test('should handle rapid consumption and refill', () => {
    for (let i = 0; i < 5; i++) {
      expect(rateLimiter.tryConsume(2)).toBe(true);
      jest.advanceTimersByTime(1000);
    }

    expect(rateLimiter.getAvailableTokens()).toBe(5);
  });
});