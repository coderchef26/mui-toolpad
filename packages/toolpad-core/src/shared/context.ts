'use client';
import * as React from 'react';
import type { PaletteMode } from '@mui/material';
import type { Branding, Navigation, Router } from '../AppProvider';
import type { DashboardSidebarPageItemContextProps } from '../DashboardLayout/DashboardSidebarPageItem';
import type { DataModel } from '../Crud';
import type { CrudProviderProps } from '../Crud/CrudProvider';
import type { DataSourceCache } from '../Crud/cache';
import type { PermissionsContextValue } from './permissions';

export const BrandingContext = React.createContext<Branding | null>(null);

export const NavigationContext = React.createContext<Navigation>([]);

export const PaletteModeContext = React.createContext<{
  paletteMode: PaletteMode;
  setPaletteMode: (mode: PaletteMode) => void;
  isDualTheme: boolean;
}>({
  paletteMode: 'light',
  setPaletteMode: () => {},
  isDualTheme: false,
});

export const RouterContext = React.createContext<Router | null>(null);

export const DashboardSidebarPageItemContext =
  React.createContext<DashboardSidebarPageItemContextProps | null>(null);

export const CrudContext = React.createContext<{
  dataSource: CrudProviderProps<DataModel>['dataSource'] | null;
  dataSourceCache: DataSourceCache | null;
}>({
  dataSource: null,
  dataSourceCache: null,
});

export const WindowContext = React.createContext<Window | undefined>(undefined);

/**
 * Provides permission-checking capabilities to the component tree.
 * The default value always returns `true` so existing apps without a
 * `permissions` prop on `AppProvider` are completely unaffected.
 */
export const PermissionsContext = React.createContext<PermissionsContextValue>({
  check: () => true,
});

/**
 * Pre-filtered navigation (items hidden by permission rules already removed).
 * Consumed by `DashboardSidebarSubNavigation` instead of the raw `NavigationContext`.
 */
export const FilteredNavigationContext = React.createContext<Navigation>([]);
