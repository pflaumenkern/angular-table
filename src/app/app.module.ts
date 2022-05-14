import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from "./lib/table/table.module";
import { ExampleCellsModule } from "./example-cells/example-cells.module";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDividerModule } from "@angular/material/divider";
import { ExampleFiltersModule } from "./example-filters/example-filters.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatToolbarModule,
    TableModule,
    ExampleCellsModule,
    ExampleFiltersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
