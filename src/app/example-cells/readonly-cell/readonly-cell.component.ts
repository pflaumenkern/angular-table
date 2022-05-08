import { Component } from '@angular/core';
import { CellComponent } from "../../lib/table/cells/cell.component";

/**
 * Readonly cell example showing simple cell formatting, by aligning content to the right. More complex cases may be
 * handled with own cell implementations according to business needs.
 */
@Component({
  selector: 'app-readonly-cell',
  templateUrl: './readonly-cell.component.html',
  styleUrls: ['./readonly-cell.component.css']
})
export class ReadonlyCellComponent extends CellComponent {

  constructor() {
    super();
  }
}
