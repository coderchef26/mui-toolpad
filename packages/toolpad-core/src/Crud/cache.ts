export interface RetryConfig {
  /**
   * Maximum number of retry attempts after the initial failure.
   * @default 3
   */
  maxRetries?: number;
  /**
   * Delay before the first retry in milliseconds.
   * @default 500
   */
  initialDelay?: number;
  /**
   * Multiplier applied to the delay after each consecutive failure.
   * @default 2
   */
  backoffFactor?: number;
}

export type DataSourceCacheConfig = {
  /**
   * Time To Live for each cache entry in milliseconds.
   * After this time the cache entry will become stale and the next query will result in cache miss.
   * @default 300000 (5 minutes)
   */
  ttl?: number;
  /**
   * Optional exponential back-off retry configuration for failed fetch calls.
   * When omitted, failed requests are not retried.
   */
  retry?: RetryConfig;
};

export class DataSourceCache {
  private cache: Record<string, { value: unknown; expiry: number }>;

  private ttl: number;

  readonly retry: RetryConfig | undefined;

  constructor(config?: DataSourceCacheConfig) {
    this.cache = {};
    this.ttl = config?.ttl ?? 300000;
    this.retry = config?.retry;
  }

  set(key: string, value: unknown) {
    const expiry = Date.now() + this.ttl;
    this.cache[key] = { value, expiry };
  }

  get(key: string): unknown | undefined {
    const entry = this.cache[key];
    if (!entry) {
      return undefined;
    }

    if (Date.now() > entry.expiry) {
      delete this.cache[key];
      return undefined;
    }

    return entry.value;
  }

  clear() {
    this.cache = {};
  }

  /**
   * Remove all cache entries whose key starts with `prefix`.
   * Useful for invalidating a class of entries (e.g. all `getMany` results)
   * without discarding `getOne` entries that are still valid.
   */
  clearByPrefix(prefix: string) {
    for (const key of Object.keys(this.cache)) {
      if (key.startsWith(prefix)) {
        delete this.cache[key];
      }
    }
  }

  /**
   * Remove a single cache entry by its exact key.
   */
  invalidate(key: string) {
    delete this.cache[key];
  }
}
