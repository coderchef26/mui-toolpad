'use client';
import * as React from 'react';
import { PermissionsContext } from '../shared/context';
import type { PermissionCheck } from '../shared/permissions';

export interface PermissionGuardProps {
  /**
   * The permission to check before rendering children.
   * Accepts a boolean, a list of required roles, or a function `(session) => boolean`.
   */
  permission: PermissionCheck;
  /**
   * Content rendered when the permission check **fails**.
   * Defaults to `null` (renders nothing on denial).
   */
  fallback?: React.ReactNode;
  /**
   * Content rendered when the permission check **passes**.
   */
  children?: React.ReactNode;
}

/**
 * Conditionally renders `children` when the `permission` check passes.
 * When the check fails it renders `fallback` (default: nothing).
 *
 * @example
 * ```tsx
 * <PermissionGuard permission={['admin']} fallback={<p>Access denied</p>}>
 *   <AdminPanel />
 * </PermissionGuard>
 * ```
 */
function PermissionGuard({ permission, fallback = null, children }: PermissionGuardProps) {
  const { check } = React.useContext(PermissionsContext);

  if (!check(permission)) {
    return <React.Fragment>{fallback}</React.Fragment>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export { PermissionGuard };
