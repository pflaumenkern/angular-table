import { ColumnConfig } from "../table.config";

/**
 * Data provided to the cell component.
 */
export interface CellData {
  /**
   * Column configuration of this cell.
   */
  config: ColumnConfig;
  /**
   * Underlying row model.
   */
  model: any;
}
