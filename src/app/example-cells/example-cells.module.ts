import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadonlyCellComponent } from './readonly-cell/readonly-cell.component';
import { EditableCellComponent } from './editable-cell/editable-cell.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ReadonlyCellComponent,
    EditableCellComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    ReadonlyCellComponent,
    EditableCellComponent
  ]
})
export class ExampleCellsModule { }
