import {Component, ContentChild, Input, AfterViewInit} from '@angular/core';
import {SBItemBodyComponent} from './sb-item.body';
import {sbConfig} from './sb.config';

@Component({
  exportAs: 'sbItem',
  selector: 'mdb-item',
  templateUrl: 'sb-item.html'
})
export class SBItemComponent implements AfterViewInit {

  private squeezebox: any;

  @Input() public collapsed = true;

  @ContentChild(SBItemBodyComponent) body: SBItemBodyComponent;

  constructor() {
    this.squeezebox = sbConfig.serviceInstance;
  }

  ngAfterViewInit() {
    this.body.toggle(this.collapsed);
  }
  toggle(collapsed: boolean) {
    this.squeezebox.didItemToggled(this);
    this.applyToggle(collapsed);
  }

  applyToggle(collapsed: boolean) {
    this.collapsed = collapsed;
    this.body.toggle(collapsed);
  }

}
