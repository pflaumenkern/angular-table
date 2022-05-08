import { DynamicHostComponent, DynamicHostConfig, DynamicHostDirective } from './dynamic-host.directive';
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Subject } from 'rxjs';
import { By } from "@angular/platform-browser";

/**
 * Test component without data change ability.
 */
@Component({
  selector: 'app-test-host',
  template: '{{ data }}',
})
class TestHostComponent implements DynamicHostComponent {
  data: any;
}

/**
 * Test component with data change ability.
 */
@Component({
  selector: 'app-test-data-change-host',
  template: '{{ data }}',
})
class TestDataChangeHostComponent implements DynamicHostComponent {
  data: any;
  dataChange = new Subject<any>();
}

/**
 * Test container for {@link DynamicHostDirective}.
 */
@Component({
  selector: 'app-test-dynamic-host-container',
  template: `
    <ng-template appDynamicHost [dynamicHostConfig]="hostConfig"></ng-template>
    <ng-template appDynamicHost
                 [dynamicHostConfig]="hostConfigWithDataChange"
                 (dataChange)="dataChange.next($event)"></ng-template>
  `,
})
class DynamicHostDirectiveContainerComponent {
  /**
   * Configuration for testing {@link TestHostComponent}.
   */
  hostConfig: DynamicHostConfig = {
    component: TestHostComponent,
    data: 'Host'
  };
  /**
   * Configuration for testing {@link TestDataChangeHostComponent}.
   */
  hostConfigWithDataChange: DynamicHostConfig = {
    component: TestDataChangeHostComponent,
    data: 'HostWithDataChange'
  };
  /**
   * Receiver of dataChange events from {@link TestDataChangeHostComponent}.
   */
  dataChange = new Subject<any>();
}

describe('DynamicHostDirective', () => {
  let containerComponent: DynamicHostDirectiveContainerComponent;
  let fixture: ComponentFixture<DynamicHostDirectiveContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicHostDirective, DynamicHostDirectiveContainerComponent, TestHostComponent, TestDataChangeHostComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicHostDirectiveContainerComponent);
    containerComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(containerComponent).toBeTruthy();
  });

  it('should forward data to dynamic host', () => {
    const testHost = fixture.debugElement.query(By.css('app-test-host')).nativeElement;
    const testHostWithDataChange = fixture.debugElement.query(By.css('app-test-data-change-host')).nativeElement;

    expect(testHost.textContent).toEqual('Host');
    expect(testHostWithDataChange.textContent).toEqual('HostWithDataChange');
  });

  it('should forward data changes', () => {
    let dataChangeValue: any;
    containerComponent.dataChange.subscribe((value) => dataChangeValue = value);

    const hostComponent = fixture.debugElement.query(By.css('app-test-data-change-host')).componentInstance;
    hostComponent.dataChange.next('Forwarded data');

    expect(dataChangeValue).toEqual('Forwarded data');
  });
});
