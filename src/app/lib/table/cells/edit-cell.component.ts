import { CellComponent } from "./cell.component";
import { EventEmitter } from "@angular/core";

/**
 * Base class for editable cells.
 */
export class EditCellComponent extends CellComponent {

  public readonly dataChange: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    super();
  }

  /**
   * Update the model with the new cell value and trigger a data change event.
   * @param cellValue new cell value
   */
  updateAndPropagate(cellValue: any): void {
    const id = this.getColumnId();
    if (this.data?.model && id) {
      this.data.model[id] = cellValue;
      this.dataChange.emit();
    }
  }
}
