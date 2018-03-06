import { Component, Host, Input, OnDestroy, OnInit } from '@angular/core';

import { ProgressDirective } from './progress.directive';

// todo: number pipe
// todo: use query from progress?
@Component({
  selector: 'mdb-bar',
  templateUrl: './bar.component.html'
})
export class BarComponent implements OnInit, OnDestroy {
  public max: number;

  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() public type: string;
  /** current value of progress bar */
  @Input()
  public get value(): number {
    return this._value;
  }

  public set value(v: number) {
    if (!v && v !== 0) {
        return;
    }
    this._value = v;
    this.recalculatePercentage();
  }

  public percent = 0;
  public transition: string;
  public progress: ProgressDirective;

  protected _value: number;

  public constructor(@Host() progress: ProgressDirective) {
    this.progress = progress;
  }

  public ngOnInit(): void {
    this.progress.addBar(this);
  }

  public ngOnDestroy(): void {
    this.progress.removeBar(this);
  }

  public recalculatePercentage(): void {
    this.percent = +(100 * this.value / this.progress.max).toFixed(2);

    const totalPercentage = this.progress.bars.reduce(function (total: number, bar: BarComponent): number {
        return total + bar.percent;
    }, 0);

    if (totalPercentage > 100) {
        this.percent -= totalPercentage - 100;
    }
  }
}
