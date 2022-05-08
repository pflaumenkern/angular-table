import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadonlyCellComponent } from './readonly-cell.component';
import { By } from "@angular/platform-browser";

describe('ReadonlyCellComponent', () => {
  let component: ReadonlyCellComponent;
  let fixture: ComponentFixture<ReadonlyCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadonlyCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show cell value', () => {
    component.data = {
      config: { id: 'test', title: 'Test', cellComponent: ReadonlyCellComponent },
      model: { test: 'VALUE' }
    };
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span')).nativeElement;

    expect(span.textContent).toEqual('VALUE');
  });
});
