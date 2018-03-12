import { Component, Output, EventEmitter, ViewChildren, HostBinding, Input, OnDestroy, OnInit, ElementRef } from '@angular/core';

import { TabDirective } from './tab.directive';
import { TabsetConfig } from './tabset.config';

import { RippleDirective } from './../../free/ripple';
// todo: add active event to tab
// todo: fix? mixing static and dynamic tabs position tabs in order of creation
@Component({
  selector: 'mdb-tabset',
  templateUrl: 'tabset.component.html',
  providers: [RippleDirective]
})

export class TabsetComponent implements OnDestroy, OnInit {
  public tabs: TabDirective[] = [];
  public classMap: any = {};

  protected isDestroyed: boolean;
  protected _vertical: boolean;
  protected _justified: boolean;
  protected _type: string;

  public listGetClass: String;
  public tabsGetClass: String;

  @HostBinding('class.tab-container') public clazz = true;


  @Input() buttonClass: String;
  @Input() contentClass: String;
  /** if true tabs will be placed vertically */

  @ViewChildren('tabEl', {read: ElementRef}) tabEl: any;

  @Output()
  showBsTab: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  shownBsTab: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  hideBsTab: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  hiddenBsTab: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    this._vertical = value;
    this.setClassMap();
  }
   public setActiveTab(index: number): void {
    this.tabs[index - 1].active = true;
  }
  /** if true tabs fill the container and have a consistent width */
  @Input()
  public get justified(): boolean {
    return this._justified;
  }
  public set justified(value: boolean) {
    this._justified = value;
    this.setClassMap();
  }

  /** navigation context class: 'tabs' or 'pills' */
  @Input()
  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
    this.setClassMap();
  }

  public constructor(config: TabsetConfig, public ripple: RippleDirective) {
    Object.assign(this, config);
  }

  public click(event: any, index: any) {
    const prev = this.tabEl.toArray()[this.getActive()];
    const clicked = this.tabEl.toArray()[index];

    this.hideBsTab.emit({
      target: clicked,
      relatedTarget: prev
    });
    this.showBsTab.emit({
      target: clicked,
      relatedTarget: prev
    });

    this.setActiveTab(index + 1);
    if (this.contentClass !== 'vertical') {
      this.ripple.el = clicked;
      this.ripple.click(event);
    }

     this.hiddenBsTab.emit({
      target: clicked,
      relatedTarget: prev
    });
    this.shownBsTab.emit({
      target: clicked,
      relatedTarget: prev
    });
  }

  public ngOnDestroy(): void {
    this.isDestroyed = true;
  }

  // public getActive() {
    public getActive(): any {
    const tabs = this.tabs.map((object, index) => {
      return {
        index: index,
        object: object
      };
    });

    for (const tab of tabs) {
      if (tab.object.active) {
        return tab.index;
      }
    }
  }

  public addTab(tab: TabDirective): void {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && tab.active !== false;
  }

  public removeTab(tab: TabDirective): void {
    const index = this.tabs.indexOf(tab);
    if (index === -1 || this.isDestroyed) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && this.hasAvailableTabs(index)) {
      const newActiveIndex = this.getClosestTabIndex(index);
      this.tabs[newActiveIndex].active = true;
    }

    tab.removed.emit(tab);
    this.tabs.splice(index, 1);
  }

  protected getClosestTabIndex(index: number): number {
    const tabsLength = this.tabs.length;
    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step += 1) {
      const prevIndex = index - step;
      const nextIndex = index + step;
      if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
        return prevIndex;
      }
      if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
        return nextIndex;
      }
    }
    return -1;
  }

  protected hasAvailableTabs(index: number): boolean {
    const tabsLength = this.tabs.length;
    if (!tabsLength) {
      return false;
    }

    for (let i = 0; i < tabsLength; i += 1) {
      if (!this.tabs[i].disabled && i !== index) {
        return true;
      }
    }
    return false;
  }

  protected setClassMap(): void {
    this.classMap = {
      'nav-stacked': this.vertical,
      'nav-justified': this.justified,
      // [`nav-${this.type}`]: true
    };
  }

  public listGet() {
    if (this.vertical) {
      this.listGetClass = 'col-md-3';
    } else {
      this.listGetClass = 'col-md-12';
    }
  }

  public tabsGet() {
    if (this.vertical) {
      this.tabsGetClass = 'col-md-9';
    } else {
      this.tabsGetClass = 'col-md-12';
    }
  }
  ngOnInit() {
    this.listGet();
    this.tabsGet();
  }
}
