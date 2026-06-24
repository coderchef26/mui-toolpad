import type { Session } from '../AppProvider';

/**
 * A permission check can be:
 * - `boolean` — static allow/deny
 * - `string[]` — allowed if the session user has at least one matching role
 * - `(session) => boolean` — dynamic check based on the current session
 */
export type PermissionCheck = boolean | string[] | ((session: Session | null) => boolean);

/**
 * Per-operation permission checks for a CRUD data source.
 * Each operation is independently controlled.
 */
export interface CrudPermissions {
  create?: PermissionCheck;
  read?: PermissionCheck;
  update?: PermissionCheck;
  delete?: PermissionCheck;
}

/**
 * Application-level permissions configuration passed to `AppProvider`.
 */
export interface PermissionsConfig {
  /**
   * Optional resolver that maps role names to named permissions.
   * The `check()` function in `PermissionsContext` evaluates role-based checks
   * against `session.user.roles`; this resolver allows you to add an extra
   * mapping layer (e.g. roles → named permissions).
   */
  resolver?: (roles: string[]) => string[];

  /**
   * Optional CSRF token provider. Accessible via `usePermissions()` so
   * DataSource implementations can attach the token to mutating requests.
   */
  getCsrfToken?: () => string | Promise<string>;
}

/**
 * Derived permissions context value resolved from the raw config + session.
 */
export interface PermissionsContextValue {
  /**
   * Evaluate a `PermissionCheck` against the current session.
   * Returns `true` if the check passes, `false` otherwise.
   *
   * Defaults to `() => true` so existing apps without a permissions config
   * are unaffected.
   */
  check: (permission: PermissionCheck) => boolean;

  /**
   * The resolved CSRF token provider, if configured.
   */
  getCsrfToken?: () => string | Promise<string>;
}

/**
 * Resolve a `PermissionCheck` against the provided session.
 *
 * @param permission - The check to evaluate.
 * @param session    - The current session (may be null).
 * @param resolver   - Optional role resolver from `PermissionsConfig`.
 * @returns `true` if the check passes.
 */
export function resolvePermissionCheck(
  permission: PermissionCheck,
  session: Session | null,
  resolver?: (roles: string[]) => string[],
): boolean {
  if (typeof permission === 'boolean') {
    return permission;
  }

  if (typeof permission === 'function') {
    return permission(session);
  }

  // String[] — check against session user roles
  const rawRoles: string[] = (session?.user as { roles?: string[] })?.roles ?? [];
  const roles = resolver ? resolver(rawRoles) : rawRoles;

  return permission.some((requiredRole) => roles.includes(requiredRole));
}
