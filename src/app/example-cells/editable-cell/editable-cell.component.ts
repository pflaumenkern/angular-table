import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditCellComponent } from "../../lib/table/cells/edit-cell.component";
import { FormControl, Validators } from "@angular/forms";
import { debounceTime, Subscription } from "rxjs";

/**
 * Editable cell example showing simple cell editing with a {@link FormControl}. More complex cases with service
 * injection may be handled with own editable cell implementations according to business needs.
 */
@Component({
  selector: 'app-editable-cell',
  templateUrl: './editable-cell.component.html',
  styleUrls: ['./editable-cell.component.css']
})
export class EditableCellComponent extends EditCellComponent implements OnInit, OnDestroy {

  public readonly inputCtrl: FormControl;

  private readonly subscription: Subscription;

  constructor() {
    super();
    this.inputCtrl = new FormControl('', [Validators.required]);
    this.subscription = this.inputCtrl.statusChanges.pipe(debounceTime(750)).subscribe((status) => {
      if (status === 'VALID') {
        this.updateAndPropagate(this.inputCtrl.value);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.inputCtrl.setValue(this.getCellValue(), { emitEvent: false });
  }
}
