import { Injectable } from '@angular/core';

@Injectable()
export class ProgressbarConfigComponent {
  /** if `true` changing value of progress bar will be animated (note: not supported by Bootstrap 4) */
  public animate: Boolean = true;
  /** maximum total value of progress element */
  public max = 100;
}
