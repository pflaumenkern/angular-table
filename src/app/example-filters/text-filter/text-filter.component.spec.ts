import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TextFilterComponent } from './text-filter.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CellComponent } from "../../lib/table/cells/cell.component";

describe('TextFilterComponent', () => {
  let component: TextFilterComponent;
  let fixture: ComponentFixture<TextFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextFilterComponent ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger data change', fakeAsync(() => {
    let dataChangeTriggered = false;
    component.dataChange.subscribe(() => dataChangeTriggered = true);
    component.data = { id: 'test', title: 'Test', cellComponent: CellComponent, filterComponent: TextFilterComponent };

    component.inputCtrl.setValue('Test');

    tick(1000);

    expect(dataChangeTriggered).toBeTrue();
  }));
});
