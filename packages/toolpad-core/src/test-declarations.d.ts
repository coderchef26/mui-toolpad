/**
 * Ambient declarations for test-only packages that may not be installed
 * in every environment (CI, contributors who skip optional devDeps, etc.).
 */

declare module 'vitest-axe' {
  import type { AxeResults } from 'axe-core';

  export function axe(
    node: Element | string,
    options?: Record<string, unknown>,
  ): Promise<AxeResults>;

  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): {
      pass: boolean;
      message(): string;
    };
  };
}
