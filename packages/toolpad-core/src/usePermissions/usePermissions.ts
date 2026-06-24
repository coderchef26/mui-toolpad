'use client';
import * as React from 'react';
import { PermissionsContext } from '../shared/context';
import type { PermissionCheck, PermissionsContextValue } from '../shared/permissions';

/**
 * Returns the full permissions context value, including the `check` function
 * and optional `getCsrfToken`.
 *
 * @example
 * ```tsx
 * const { check } = usePermissions();
 * if (check(['admin'])) { ... }
 * ```
 */
export function usePermissions(): PermissionsContextValue {
  return React.useContext(PermissionsContext);
}

/**
 * Convenience hook that evaluates a single permission check and returns a boolean.
 *
 * @param permission - The permission to check.
 * @returns `true` if the current user passes the check.
 *
 * @example
 * ```tsx
 * const canCreate = useHasPermission(['admin', 'editor']);
 * ```
 */
export function useHasPermission(permission: PermissionCheck): boolean {
  const { check } = React.useContext(PermissionsContext);
  return check(permission);
}
