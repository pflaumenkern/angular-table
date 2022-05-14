import { Component } from '@angular/core';
import { FilterComponent } from "../../lib/table/filters/filter.component";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrls: ['./text-filter.component.css']
})
export class TextFilterComponent extends FilterComponent {

  public readonly inputCtrl: FormControl;

  private readonly subscription: Subscription;

  constructor() {
    super();
    this.inputCtrl = new FormControl();
    this.subscription = this.inputCtrl.valueChanges.subscribe((value) => this.dataChange.emit(value));
  }

  createPlaceholder(): string {
    return `${this.data?.title} filter`;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
