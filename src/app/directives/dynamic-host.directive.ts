import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from "rxjs";

/**
 * Common interface for dynamically generated components.
 */
export interface DynamicHostComponent {
  /**
   * Input data for the component. It will be available in {@link OnInit#ngOnInit} method.
   */
  data: any;
  /**
   * Trigger data change notifications.
   */
  dataChange?: Observable<any>;
}

/**
 * Configuration for {@link DynamicHostDirective}.
 */
export interface DynamicHostConfig {
  /**
   * Component to be created.
   */
  component: Type<DynamicHostComponent>;
  /**
   * Input data for the dynamically generated component.
   */
  data: any;
}

/**
 * Dynamically load components, see {@link https://angular.io/guide/dynamic-component-loader} for details.
 */
@Directive({
  selector: 'ng-template[appDynamicHost]'
})
export class DynamicHostDirective implements OnDestroy, OnInit {

  @Input()
  public dynamicHostConfig: DynamicHostConfig | undefined;
  @Output()
  public readonly dataChange: EventEmitter<any>;

  private dataChangeSubscription: Subscription | undefined;

  constructor(private readonly viewContainerRef: ViewContainerRef) {
    this.dataChange = new EventEmitter<any>();
  }

  ngOnDestroy(): void {
    if (this.dataChangeSubscription) {
      this.dataChangeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    const config = this.dynamicHostConfig;
    if (config) {
      this.viewContainerRef.clear();

      const componentRef = this.viewContainerRef.createComponent<DynamicHostComponent>(config.component);
      const instance = componentRef.instance;
      // Set data for the component.
      instance.data = config.data;
      // Propagate dataChange events, if supported.
      this.dataChangeSubscription = instance.dataChange?.subscribe((value: any) => this.dataChange.emit(value));
    }
  }
}
