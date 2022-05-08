import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from "@angular/core";
import { TableComponent } from './table.component';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { DirectivesModule } from "../directives/directives.module";
import { CellComponent } from "./cells/cell.component";
import { EditCellComponent } from "./cells/edit-cell.component";
import { By } from "@angular/platform-browser";

@Component({
  selector: 'app-test-readonly-cell',
  template: '<span>{{ getCellValue() }}</span>'
})
class TestReadonlyCellComponent extends CellComponent {
  constructor() {
    super();
  }
}

@Component({
  selector: 'app-test-editable-cell',
  template: '<span>{{ getCellValue() }}</span>'
})
class TestEditableCellComponent extends EditCellComponent {
  constructor() {
    super();
  }
}

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [
        MatTableModule,
        DirectivesModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Title', () => {
    it('should return value', () => {
      component.config = {
        columns: [
          { id: 'colId', title: 'Test', cellComponent: CellComponent }
        ]
      };
      const actual = component.getColumnTitleFor('colId');

      expect(actual).toEqual('Test');
    });

    it('should return undefined, if column not found', () => {
      const actual = component.getColumnTitleFor('colId');

      expect(actual).toBeUndefined();
    });
  });

  describe('DynamicHostConfig', () => {
    it('should return value', () => {
      component.config = {
        columns: [
          { id: 'colId', title: 'Test', cellComponent: CellComponent }
        ]
      };
      const actual = component.createHostConfigFor('colId', 'Test');

      expect(actual).toBeDefined();
    });

    it('should return undefined, if column config missing', () => {
      const actual = component.createHostConfigFor('colId', 'Test');

      expect(actual).toBeUndefined();
    });
  });

  describe('Table', () => {
    beforeEach(() => {
      component.config = {
        columns: [
          { id: 'readonly', title: 'Readonly Cell', cellComponent: TestReadonlyCellComponent },
          { id: 'editable', title: 'Editable Cell', cellComponent: TestEditableCellComponent },
        ]
      };
      component.dataSource = new MatTableDataSource([{ readonly: 'Readonly Value', editable: 'Editable Value' }]);
      component.ngOnInit();

      fixture.detectChanges();
    });

    it('should show headers and cells', () => {
      const toTextContent = (debugElement: DebugElement) => debugElement.nativeElement.textContent;
      const headers = fixture.debugElement.queryAll(By.css('th')).map(toTextContent);
      const cells = fixture.debugElement.queryAll(By.css('td')).map(toTextContent);

      expect(headers).toEqual(['Readonly Cell', 'Editable Cell']);
      expect(cells).toEqual(['Readonly Value', 'Editable Value']);
    });

    it('should forward element change', () => {
      let elementChangeTriggered = false;
      component.elementChange.subscribe((element) => elementChangeTriggered = element != null);

      const editableCell = fixture.debugElement.query(By.css('app-test-editable-cell')).componentInstance;
      editableCell.updateAndPropagate('New value');

      expect(elementChangeTriggered).toBeTrue();
    });
  });
});
