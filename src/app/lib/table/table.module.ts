import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule } from "@angular/material/table";
import { DirectivesModule } from "../directives/directives.module";

@NgModule({
  declarations: [
    TableComponent
  ],
  exports: [
    TableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    DirectivesModule
  ]
})
export class TableModule { }
