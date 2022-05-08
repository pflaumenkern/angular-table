import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { EditableCellComponent } from './editable-cell.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

describe('EditableCellComponent', () => {
  let component: EditableCellComponent;
  let fixture: ComponentFixture<EditableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditableCellComponent ],
      imports: [ NoopAnimationsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger data change', fakeAsync(() => {
    let dataChangeTriggered = false;
    component.dataChange.subscribe(() => dataChangeTriggered = true);
    component.data = {
      config: { id: 'test', title: 'Test', cellComponent: EditableCellComponent },
      model: { test: 'VALUE' }
    };
    component.ngOnInit();

    component.inputCtrl.setValue('Test');

    tick(1000);

    expect(dataChangeTriggered).toBeTrue();
  }));
});
