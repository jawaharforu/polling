import { Component, Input } from '@angular/core';
import { ProgressbarConfigComponent } from './progressbar.config.component';

@Component({
  selector: 'mdb-progressbar',
  templateUrl: './progressbar.component.html'
})
export class ProgressbarComponent {
    /** if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4) */
  @Input() public animate: boolean;
  /** maximum total value of progress element */
  @Input() public max: number;
  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() public type: string;
  /** current value of progress bar */
  @Input() public value: number;

  public constructor(config: ProgressbarConfigComponent) {
    Object.assign(this, config);
  }
}
