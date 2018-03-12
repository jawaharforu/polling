import { AfterViewInit, Directive, ElementRef, Host, HostListener, OnDestroy, OnInit } from '@angular/core';

import { CompleterItem } from '../components/completer-item.component';
import { MdbCompleterDirective, CompleterDropdown } from './completer.directive';


export interface CtrRowElement {
  setHighlighted(selected: boolean): void;
  getNativeElement(): any;
  getDataItem(): CompleterItem;
}

export class CtrRowItem {
  constructor(public row: CtrRowElement, public index: number) { }
}

@Directive({
  selector: '[mdbDropdown]',
})
export class MdbDropdownDirective implements CompleterDropdown, OnDestroy, OnInit, AfterViewInit {

  public setToNullValue: any = null;
  private rows: CtrRowItem[] = [];
  // private currHighlighted: CtrRowItem;
  private currHighlighted: CtrRowItem | any;
  // private isScrollOn: boolean;
  private isScrollOn: boolean | any;

  constructor( @Host() private completer: MdbCompleterDirective, private el: ElementRef) {
    this.completer.registerDropdown(this);
  }

  public ngOnInit() {
    const css = getComputedStyle(this.el.nativeElement);
    this.isScrollOn = css.maxHeight && css.overflowY === 'auto';
  }

  public ngOnDestroy() {
    // this.completer.registerDropdown(null);
    this.completer.registerDropdown(this.setToNullValue);
  }

  public ngAfterViewInit() {
    const autoHighlightIndex = this.completer.autoHighlightIndex;
    if (autoHighlightIndex) {
      setTimeout(
        () => {
          this.highlightRow(autoHighlightIndex);
        },
        0
      );
    }
  }

  @HostListener('mousedown', ['$event']) public onMouseDown() {
    // Support for canceling blur on IE (issue #158)
    this.completer.cancelBlur(true);
    setTimeout(
      () => {
        this.completer.cancelBlur(false);
      },
      0
    );
  }

  public registerRow(row: CtrRowItem) {
    this.rows.push(row);
  }

  public highlightRow(index: number): any {

    const highlighted = this.rows.find(row => row.index === index);

    if (index < 0) {
      if (this.currHighlighted) {
        this.currHighlighted.row.setHighlighted(false);
      }
      this.currHighlighted = undefined;
      this.completer.onHighlighted(this.setToNullValue);
      return;
    }

    if (!highlighted) {
      return;
    }

    if (this.currHighlighted) {
      this.currHighlighted.row.setHighlighted(false);
    }

    this.currHighlighted = highlighted;
    this.currHighlighted.row.setHighlighted(true);
    this.completer.onHighlighted(this.currHighlighted.row.getDataItem());

    if (this.isScrollOn && this.currHighlighted) {
      const rowTop = this.dropdownRowTop();
      if (rowTop < 0) {
        this.dropdownScrollTopTo(rowTop - 1);
      } else {
        const row = this.currHighlighted.row.getNativeElement();
        if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
          this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
          if (this.el.nativeElement.getBoundingClientRect().bottom - this.dropdownRowOffsetHeight(row)
            < row.getBoundingClientRect().top) {
            this.dropdownScrollTopTo(row.getBoundingClientRect().top - (this.el.nativeElement.getBoundingClientRect().top
            // + parseInt(getComputedStyle(this.el.nativeElement).paddingTop, 10)));
            + parseInt(getComputedStyle(this.el.nativeElement).paddingTop as any, 10)));
          }
        }
      }
    }
  }

  public clear() {
    this.rows = [];
  }

  public onSelected(item: CompleterItem) {
    this.completer.onSelected(item);
  }

  public selectCurrent() {
    if (this.currHighlighted) {
      this.onSelected(this.currHighlighted.row.getDataItem());
    } else if (this.rows.length > 0) {
      this.onSelected(this.rows[0].row.getDataItem());
    }

  }

  public nextRow() {
    let nextRowIndex = 0;
    if (this.currHighlighted) {
      nextRowIndex = this.currHighlighted.index + 1;
    }
    this.highlightRow(nextRowIndex);
  }

  public prevRow() {
    let nextRowIndex = -1;
    if (this.currHighlighted) {
      nextRowIndex = this.currHighlighted.index - 1;
    }
    this.highlightRow(nextRowIndex);
  }

  private dropdownScrollTopTo(offset: any) {
    this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop + offset;
  }

  private dropdownRowTop() {
    return this.currHighlighted.row.getNativeElement().getBoundingClientRect().top -
      (this.el.nativeElement.getBoundingClientRect().top +
        // parseInt(getComputedStyle(this.el.nativeElement).paddingTop, 10));
        parseInt(getComputedStyle(this.el.nativeElement).paddingTop as any, 10));
  }

  private dropdownHeight() {
    return this.el.nativeElement.getBoundingClientRect().top +
      // parseInt(getComputedStyle(this.el.nativeElement).maxHeight, 10);
      parseInt(getComputedStyle(this.el.nativeElement).maxHeight as any, 10);
  }

  private dropdownRowOffsetHeight(row: any) {
    const css = getComputedStyle(row);
    return row.offsetHeight +
      // parseInt(css.marginTop, 10) + parseInt(css.marginBottom, 10);
      parseInt(css.marginTop as any, 10) + parseInt(css.marginBottom as any, 10);
  }
}
