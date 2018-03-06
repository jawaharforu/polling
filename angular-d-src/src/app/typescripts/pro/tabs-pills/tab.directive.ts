import { Directive, EventEmitter, HostBinding, Input, Output, TemplateRef, ElementRef, OnInit } from '@angular/core';
import { TabsetComponent } from './tabset.component';

@Directive({selector: 'mdb-tab, [mdbTab]'})
export class TabDirective implements OnInit {
  /** tab header text */
  @Input() public heading: string;
  /** if true tab can not be activated */
  @Input() public disabled: boolean;
  /** if true tab can be removable, additional button will appear */
  @Input() public removable: boolean;
  /** if set, will be added to the tab's class atribute */
  @Input() public customClass: string;

  /** tab active state toggle */
  @HostBinding('class.active')
  @Input()
  public get active(): boolean {
    return this._active;
  }

  public set active(active: boolean) {

    if (this.disabled && active || !active) {
      if (!active) {
        this.removeClass(this.el.nativeElement, 'show');
        setTimeout(() => {
          this._active = active;
          this.deselect.emit(this);
        }, 150);
      }
      return;
    }

    setTimeout(() => {
      this._active = active;
      this.classAdd(this.el.nativeElement, 'show');
    }, 150);
    this.select.emit(this);

    this.tabset.tabs.forEach((mdbTab: TabDirective) => {
      if (mdbTab !== this) {
        mdbTab.active = false;
      }
    });

  }

  /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
  @Output() public select: EventEmitter<TabDirective> = new EventEmitter();
  /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
  @Output() public deselect: EventEmitter<TabDirective> = new EventEmitter();
  /** fired before tab will be removed */
  @Output() public removed: EventEmitter<TabDirective> = new EventEmitter();

  @HostBinding('class.tab-pane') public addClass = true;
  @HostBinding('class.fade') public test = true;


  public headingRef: TemplateRef<any>;
  public tabset: TabsetComponent;
  // public el: ElementRef = null;
  public el: ElementRef | any = null;

  protected _active: boolean;

  public constructor(tabset: TabsetComponent, el: ElementRef) {
    this.el = el;
    this.tabset = tabset;
    this.tabset.addTab(this);
  }

  public ngOnInit(): void {
    this.removable = this.removable;
  }

  protected hasClass(el: any, className: any) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  }

  protected classAdd(el: any, className: any) {
    if (el.classList) {
      el.classList.add(className);
    } else if (!this.hasClass(el, className)) {
      el.className += ' ' + className;
    };
  }

  protected removeClass(el: any, className: any) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (this.hasClass(el, className)) {
      const reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }

}
