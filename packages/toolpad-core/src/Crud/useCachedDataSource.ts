import * as React from 'react';
import { DataSourceCache } from './cache';
import type { DataModel, DataModelId, DataSource } from './types';

async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  initialDelay: number,
  backoffFactor: number,
): Promise<T> {
  let attempt = 0;
  let delay = initialDelay;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      attempt += 1;
      if (attempt > maxRetries) {
        throw err;
      }
      await new Promise<void>((resolve) => {
        setTimeout(resolve, delay);
      });
      delay *= backoffFactor;
    }
  }
}

function useCachedDataSource<D extends DataModel>(
  dataSource: DataSource<D>,
  cache: DataSourceCache | null,
): DataSource<D> {
  // In-flight request deduplication: key → Promise
  const inFlightRef = React.useRef<Map<string, Promise<unknown>>>(new Map());

  return React.useMemo(() => {
    if (!cache) {
      return dataSource;
    }

    const { getMany, getOne, createOne, updateOne, deleteOne, deleteMany, ...rest } = dataSource;

    return {
      ...Object.fromEntries(
        Object.entries({ getMany, getOne })
          .filter(([_key, method]) => !!method)
          .map(([key, method]) => [
            key,
            async (...args: unknown[]) => {
              const cacheKey = JSON.stringify([key, ...args]);

              // Return cached value if still fresh
              const cacheValue = cache.get(cacheKey);
              if (cacheValue) {
                return cacheValue;
              }

              // Deduplicate in-flight requests for the same key
              const inFlight = inFlightRef.current.get(cacheKey);
              if (inFlight) {
                return inFlight;
              }

              const retryConfig = cache.retry;
              const fetchFn = () =>
                Promise.resolve(
                  (
                    method as (
                      ...args: unknown[]
                    ) =>
                      | ReturnType<NonNullable<DataSource<D>['getMany']>>
                      | ReturnType<NonNullable<DataSource<D>['getOne']>>
                  )(...args),
                );

              const request = retryConfig
                ? withRetry(
                    fetchFn,
                    retryConfig.maxRetries ?? 3,
                    retryConfig.initialDelay ?? 500,
                    retryConfig.backoffFactor ?? 2,
                  )
                : fetchFn();

              const promise = Promise.resolve(request).then((result) => {
                cache.set(cacheKey, result);
                inFlightRef.current.delete(cacheKey);
                return result;
              }).catch((err: unknown) => {
                inFlightRef.current.delete(cacheKey);
                throw err;
              });

              inFlightRef.current.set(cacheKey, promise);
              return promise;
            },
          ]),
      ),
      ...Object.fromEntries(
        Object.entries({ createOne, updateOne, deleteOne })
          .filter(([_key, method]) => !!method)
          .map(([key, method]) => [
            key,
            async (...args: unknown[]) => {
              const result = await (
                method as (
                  ...args: unknown[]
                ) =>
                  | ReturnType<NonNullable<DataSource<D>['createOne']>>
                  | ReturnType<NonNullable<DataSource<D>['updateOne']>>
                  | ReturnType<NonNullable<DataSource<D>['deleteOne']>>
              )(...args);

              // Surgical invalidation: clear list cache but keep other getOne entries intact
              cache.clearByPrefix(JSON.stringify(['getMany']));
              if (key === 'updateOne' || key === 'deleteOne') {
                // Invalidate the specific item from cache
                const id = args[0] as DataModelId;
                cache.invalidate(JSON.stringify(['getOne', id]));
              }

              return result;
            },
          ]),
      ),
      ...(deleteMany
        ? {
            deleteMany: async (ids: DataModelId[]) => {
              await deleteMany(ids);
              cache.clearByPrefix(JSON.stringify(['getMany']));
              for (const id of ids) {
                cache.invalidate(JSON.stringify(['getOne', id]));
              }
            },
          }
        : {}),
      ...rest,
    };
  }, [cache, dataSource]);
}

export { useCachedDataSource };
