import { Component } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { UserModel } from "./user.model";
import { TableConfig } from "./lib/table/table.config";
import { ReadonlyCellComponent } from "./example-cells/readonly-cell/readonly-cell.component";
import { EditableCellComponent } from "./example-cells/editable-cell/editable-cell.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataSource = new MatTableDataSource<UserModel>([
    { id: 1, firstName: 'Peter', lastName: 'Edit me' },
    { id: 2, firstName: 'John', lastName: 'Smith' },
  ]);
  tableConfig: TableConfig = {
    columns: [
      { id: 'id', title: 'ID', cellComponent: ReadonlyCellComponent },
      { id: 'firstName', title: 'First name', cellComponent: ReadonlyCellComponent },
      { id: 'lastName', title: 'Last name', cellComponent: EditableCellComponent },
    ]
  };
  elementChanges: Array<string> = [];

  onElementChange(user: UserModel): void {
    this.elementChanges.push(JSON.stringify(user));
  }
}
