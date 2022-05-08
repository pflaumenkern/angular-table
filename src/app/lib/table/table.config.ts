import { Type } from "@angular/core";
import { CellComponent } from "./cells/cell.component";

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
