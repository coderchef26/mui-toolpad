'use client';
import * as React from 'react';
import type { DataSourceCache } from '../Crud/cache';
import type { DataModel, DataSource } from '../Crud/types';

/**
 * Connects a DataSource to a real-time event stream (SSE or WebSocket).
 *
 * When the server pushes an event the hook:
 *   1. Clears the list-query entries from the supplied `cache` so stale data is evicted.
 *   2. Returns a new DataSource reference so every consumer that feeds it into
 *      `useCachedDataSource` automatically re-fetches the latest data.
 *
 * @param dataSource  The DataSource to keep up-to-date.
 * @param url         The SSE endpoint or WebSocket URL.
 * @param cache       The `DataSourceCache` passed to the same `<Crud>` or `<Crud.List>`.
 * @param protocol    `'sse'` (default) uses `EventSource`; `'websocket'` uses `WebSocket`.
 *
 * @example
 * ```tsx
 * const cache = React.useMemo(() => new DataSourceCache(), []);
 * const liveDataSource = useRealtimeDataSource(ordersDataSource, '/api/orders/stream', cache);
 * return <Crud dataSource={liveDataSource} dataSourceCache={cache} />;
 * ```
 */
function useRealtimeDataSource<D extends DataModel>(
  dataSource: DataSource<D>,
  url: string,
  cache?: DataSourceCache | null,
  protocol: 'sse' | 'websocket' = 'sse',
): DataSource<D> {
  const [version, setVersion] = React.useState(0);

  // Keep stable refs so the effect closure always sees the latest values
  // without being listed as dependencies (avoids unnecessary reconnections).
  const cacheRef = React.useRef(cache);
  cacheRef.current = cache;

  React.useEffect(() => {
    let cleanup: (() => void) | undefined;

    const handleMessage = () => {
      // Evict all list-query cache entries so the next getMany call re-fetches.
      const currentCache = cacheRef.current;
      if (currentCache) {
        currentCache.clearByPrefix(JSON.stringify(['getMany']));
      }
      // Bump version so the returned DataSource reference changes, which causes
      // useCachedDataSource's useMemo to re-run and triggers a re-fetch.
      setVersion((v) => v + 1);
    };

    if (protocol === 'sse') {
      const source = new EventSource(url);
      source.addEventListener('message', handleMessage);
      // Also listen for a common 'update' custom event name.
      source.addEventListener('update', handleMessage);
      cleanup = () => source.close();
    } else {
      const ws = new WebSocket(url);
      ws.addEventListener('message', handleMessage);
      cleanup = () => ws.close();
    }

    return () => {
      cleanup?.();
    };
  }, [url, protocol]);

  // Spread into a new object so the reference changes whenever `version` bumps,
  // causing downstream useMemo calls that depend on `dataSource` to re-evaluate.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => ({ ...dataSource }), [dataSource, version]);
}

export { useRealtimeDataSource };
