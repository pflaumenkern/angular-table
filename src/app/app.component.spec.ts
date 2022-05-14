import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { TableModule } from "./lib/table/table.module";
import { ExampleCellsModule } from "./example-cells/example-cells.module";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { By } from "@angular/platform-browser";
import { MatDividerModule } from "@angular/material/divider";
import { ExampleFiltersModule } from "./example-filters/example-filters.module";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatChipsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatToolbarModule,
        TableModule,
        ExampleCellsModule,
        ExampleFiltersModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource).toBeDefined();
    expect(component.tableConfig).toBeDefined();
    expect(component.elementChanges).toEqual([]);
  });

  it('should collect element changes', () => {
    const model = { id: 1, firstName: 'FN', lastName: 'LN' };
    const table = fixture.debugElement.query(By.css('#editableTable')).componentInstance;
    table.elementChange.emit(model);

    expect(component.elementChanges).toEqual([JSON.stringify(model)]);
  });

  it('should collect filter changes', () => {
    const table = fixture.debugElement.query(By.css('#filterableTable')).componentInstance;
    table.filterChange.emit('Filter changed');

    expect(component.dataSourceWithFilter.filter).toEqual('Filter changed');
  });
});
