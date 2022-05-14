import { DynamicHostComponent } from "../../directives/dynamic-host.directive";
import { ColumnConfig } from "../table.config";
import { EventEmitter } from "@angular/core";

/**
 * Base class of filter implementations.
 */
export class FilterComponent implements DynamicHostComponent {
  /**
   * Data will be available in {@link OnInit#ngOnInit} method.
   */
  public data: ColumnConfig | undefined; // ColumnConfig might be used for filter text or aria labels
  /**
   * Forward filter changes.
   */
  public readonly dataChange: EventEmitter<any> = new EventEmitter<any>();
}
