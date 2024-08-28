export class TokenBucket {
    private tokens: number;
    private lastRefillTimestamp: number;
    private readonly maxTokens: number;
    private readonly refillRate: number;

    constructor(maxTokens: number, refillRate: number) {
      this.maxTokens = maxTokens;
      this.refillRate = refillRate;
      this.tokens = maxTokens;
      this.lastRefillTimestamp = Date.now();
    }

    private refill(): void {
      const now = Date.now();
      const timePassed = now - this.lastRefillTimestamp;
      const tokensToAdd = (timePassed / 1000) * this.refillRate;
      this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
      this.lastRefillTimestamp = now;
    }

    public tryConsume(tokensRequested: number = 1): boolean {
      this.refill();
      if (this.tokens >= tokensRequested) {
        this.tokens -= tokensRequested;
        return true;
      }
      return false;
    }

    public getAvailableTokens(): number {
      this.refill();
      return this.tokens;
    }
  }
