import { DynamicHostComponent } from "../../directives/dynamic-host.directive";
import { CellData } from "./cell.data";
import { ColumnId } from "../table.config";

/**
 * Base class of cell implementations.
 */
export class CellComponent implements DynamicHostComponent {
  /**
   * Data will be available in {@link OnInit#ngOnInit} method.
   */
  public data: CellData | undefined;

  /**
   * Convenience method for column id access.
   */
  getColumnId(): ColumnId | undefined {
    return this.data?.config.id;
  }

  /**
   * Convenience method for cell value access.
   */
  getCellValue(): any | undefined {
    const id = this.getColumnId();
    const model = this.data?.model;
    return id && model ? model[id] : undefined;
  }
}
