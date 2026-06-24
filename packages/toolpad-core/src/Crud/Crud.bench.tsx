/**
 * @vitest-environment jsdom
 *
 * Vitest benchmarks for CRUD List render performance.
 *
 * Run with: pnpm -F @toolpad/core bench
 */

import * as React from 'react';
import { bench, describe } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { AppProvider, Router } from '../AppProvider';
import { Crud } from './Crud';
import type { DataModel, DataSource } from './types';

interface Item extends DataModel {
  id: number;
  name: string;
}

const ITEMS: Item[] = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

const dataSource: DataSource<Item> = {
  fields: [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
  ],
  getMany: async () => ({ items: ITEMS, itemCount: ITEMS.length }),
  getOne: async (id) => ITEMS.find((item) => item.id === id)!,
};

const mockRouter: Router = {
  pathname: '/items',
  searchParams: new URLSearchParams(),
  navigate: () => {},
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider router={mockRouter}>{children}</AppProvider>;
}

describe('Crud.List render benchmarks', () => {
  bench(
    'initial mount — renders list with 50 rows',
    async () => {
      const { unmount } = render(
        <Wrapper>
          <Crud dataSource={dataSource} rootPath="/items" />
        </Wrapper>,
      );
      unmount();
    },
    { iterations: 20, warmupIterations: 5 },
  );

  bench(
    'prop-stable re-render — memo prevents redundant work',
    async () => {
      // First render
      const { rerender, unmount } = render(
        <Wrapper>
          <Crud dataSource={dataSource} rootPath="/items" />
        </Wrapper>,
      );

      // Re-render with same props — React.memo should skip the heavy subtree
      rerender(
        <Wrapper>
          <Crud dataSource={dataSource} rootPath="/items" />
        </Wrapper>,
      );

      unmount();
    },
    { iterations: 20, warmupIterations: 5 },
  );
});
