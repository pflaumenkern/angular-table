import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnConfig, ColumnId, TableConfig } from "./table.config";
import { DataSource } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { DynamicHostConfig } from "../directives/dynamic-host.directive";
import { CellData } from "./cells/cell.data";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent<T> implements OnInit {

  @Input()
  public config: TableConfig = { columns: [] };
  @Input()
  public dataSource: DataSource<T> = new MatTableDataSource<T>();
  @Output()
  public readonly elementChange: EventEmitter<T> = new EventEmitter<T>();

  public displayedColumns: Array<ColumnId> = [];

  ngOnInit(): void {
    this.displayedColumns = this.config.columns.map((column: ColumnConfig) => column.id);
  }

  /**
   * Get the title by column id.
   * @param id
   */
  getColumnTitleFor(id: ColumnId): string | undefined {
    return this.findColumnConfigBy(id)?.title;
  }

  /**
   * Create the host config by column id and element.
   * @param id
   * @param element
   */
  createHostConfigFor(id: ColumnId, element: any): DynamicHostConfig | undefined {
    const config = this.findColumnConfigBy(id);
    const component = config?.cellComponent;
    if (config && component) {
      const data: CellData = { config, model: element };
      return { component, data };
    }
    return undefined;
  }

  private findColumnConfigBy(id: ColumnId): ColumnConfig | undefined {
    return this.config.columns.find((column: ColumnConfig) => column.id === id);
  }
}
