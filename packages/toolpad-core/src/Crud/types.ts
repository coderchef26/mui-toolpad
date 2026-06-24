import {
  GridColDef,
  GridColType,
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from '@mui/x-data-grid';
import type { StandardSchemaV1 } from '@standard-schema/spec';
import type { CrudPermissions } from '../shared/permissions';

export type DataModelId = string | number;

export interface DataModel {
  id: DataModelId;
  [key: PropertyKey]: unknown;
}

type RemappedOmit<T, K extends PropertyKey> = { [P in keyof T as P extends K ? never : P]: T[P] };

export type OmitId<D extends DataModel> = RemappedOmit<D, 'id'>;

export type DataFieldFormValue = string | string[] | number | boolean | File | null;

export type DataFieldRenderFormField<F extends DataFieldFormValue = DataFieldFormValue> = ({
  value,
  onChange,
  error,
}: {
  value: F;
  onChange: (value: F) => void | Promise<void>;
  error: string | null;
}) => React.ReactNode;

export type DataField<F extends DataFieldFormValue = DataFieldFormValue> = RemappedOmit<
  GridColDef,
  'type'
> & {
  type?: GridColType;
  renderFormField?: DataFieldRenderFormField<F>;
  /**
   * When provided, the field is hidden in the form when this function returns `false`.
   * Receives the current form values and the current session.
   * @param formValues - Current form values.
   * @param session    - Current session (or null).
   */
  visibleIf?: (formValues: Record<string, unknown>, session: unknown) => boolean;
  /**
   * When provided, the field is rendered in a disabled (read-only) state when
   * this function returns `true`.
   * @param formValues - Current form values.
   * @param session    - Current session (or null).
   */
  disabledIf?: (formValues: Record<string, unknown>, session: unknown) => boolean;
};

export interface DataSource<D extends DataModel> {
  fields: DataField[];
  getMany?: (params: {
    paginationModel: GridPaginationModel;
    sortModel: GridSortModel;
    filterModel: GridFilterModel;
  }) => { items: D[]; itemCount: number } | Promise<{ items: D[]; itemCount: number }>;
  getOne?: (id: DataModelId) => D | Promise<D>;
  createOne?: (data: Partial<OmitId<D>>) => D | Promise<D>;
  updateOne?: (id: DataModelId, data: Partial<OmitId<D>>) => D | Promise<D>;
  deleteOne?: (id: DataModelId) => void | Promise<void>;
  /**
   * Bulk-delete multiple items by their IDs.
   * When provided, batch-delete operations become available in the List view.
   */
  deleteMany?: (ids: DataModelId[]) => void | Promise<void>;
  /**
   * Function to validate form values. Follows the Standard Schema `validate` function format (https://standardschema.dev/).
   */
  validate?: (
    value: Partial<OmitId<D>>,
  ) => ReturnType<StandardSchemaV1<Partial<OmitId<D>>>['~standard']['validate']>;
  /**
   * Optional per-operation CRUD permission checks.
   * When omitted every operation is allowed (backward-compatible default).
   */
  permissions?: CrudPermissions;
}

// Re-export for convenience
export type { CrudPermissions };

/**
 * Utility type to infer the data model from a `DataSource`.
 *
 * @example
 * ```ts
 * type User = InferDataModel<typeof userDataSource>;
 * ```
 */
export type InferDataModel<DS> = DS extends DataSource<infer D> ? D : never;
