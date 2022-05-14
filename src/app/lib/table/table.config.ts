import { Type } from "@angular/core";
import { CellComponent } from "./cells/cell.component";
import { FilterComponent } from "./filters/filter.component";

export type ColumnId = string;

/**
 * Column configuration.
 */
export interface ColumnConfig {
  /**
   * ID of the column.
   */
  id: ColumnId;
  /**
   * Title of the column.
   */
  title: string;
  /**
   * Dynamically created cell component.
   */
  cellComponent: Type<CellComponent>;
  /**
   * Dynamically created filter component.
   */
  filterComponent?: Type<FilterComponent>;
}

/**
 * Table configuration.
 */
export interface TableConfig {
  /**
   * Columns of the table.
   */
  columns: Array<ColumnConfig>;
}
