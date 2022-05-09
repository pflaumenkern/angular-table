# Angular table using dynamic component loading

A table implementation separating the cell implementation from the table template. It is utilizing the 
[dynamic component loader](https://angular.io/guide/dynamic-component-loader) to dynamically load custom cell 
implementations. Hence, allowing a separation of business logic from the actual table implementation.

## Motivation

Some Angular projects require the usage of classic HTML tables. In such scenarios the application design prevalently 
features several views containing such HTML tables. One approach would be separate tables for each view, nevertheless 
the common solution seems to be a generic table. Such generic table implementations mostly receive their configuration 
from outside, which works fine in the beginning.

Example:
````angular2html
<table mat-table [dataSource]="...">
  <!-- columns are given as input to the table -->
  <ng-container *ngFor="let column of columns" [matColumnDef]="column.id">
    <th mat-header-cell *matHeaderCellDef>{{ column.title }}</th>
    <td mat-cell *matCellDef="let element">{{ element[column.id] }}</td>
  </ng-container>

  <!-- displayedColumns just a collection of all shown column identifiers -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
````
Over time such implementations seem to get cluttered with ever more features and business logic to cover the needs 
of each view. For example initially the table implementation may only be required to show data, but then should also 
allow data editing.

Therefore, the table implementation grows containing more and more *ngIf or ngSwitch directives to cover each case.

Example:
````angular2html
<table mat-table [dataSource]="...">
  <!-- columns are given as input to the table -->
  <ng-container *ngFor="let column of columns" [matColumnDef]="column.id">
    <th mat-header-cell *matHeaderCellDef>{{ column.title }}</th>
    <!-- Example of different cell type handling, usually the table grows extensively. -->
    <!-- Saw 1000+ lines of code already. -->
    <ng-container [ngSwitch]="column.type"> 
      <ng-container *ngSwitchCase="'date'">
        <ng-container *ngIf="column.isEditable; else readOnly">
          <td mat-cell *matCellDef="let element">
            <input matInput [matDatepicker]="picker">
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </td>
        </ng-container>
        <ng-template #readOnly>
          <td mat-cell *matCellDef="let element">{{ element[column.id] | date: 'medium' }}</td>
        </ng-template>
      </ng-container>
      <ng-container *ngSwitchCase="'number'">
        <td mat-cell *matCellDef="let element">{{ element[column.id] | number: '0.1-2' }}</td>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <td mat-cell *matCellDef="let element">{{ element[column.id] }}</td>
      </ng-container>
    </ng-container>
  </ng-container>

  <!-- displayedColumns just a collection of all shown column identifiers -->
  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
````
If the above table looks familiar then the here shown approach might be helpful to create reusable components and 
separate business logic from the table implementation.

## Structure

The application main page shows the example table. Use the `ng serve` command to start it. 

The [lib](src/app/lib) folder contains the reusable components. 
The [TableComponent](src/app/lib/table/table.component.ts) receives its data and configuration via input decorators. 
The [TableConfig](src/app/lib/table/table.config.ts) may be further extend to support filters or initial sorting.
Lastly the [DynamicHostDirective](src/app/lib/directives/dynamic-host.directive.ts) is the base implementation for 
dynamic component loading.

The [ExampleCellsModule](src/app/example-cells/example-cells.module.ts) contains example cell implementations. At the 
time of writing this is a simple readonly and an editable example cell. These cells illustrate the mutable part, which 
may be implemented according to business needs.

## To Do's

* Support column filters
* Support initial filtering
* Support initial sorting
