import {Component} from '@angular/core';
import {SBItemComponent} from './sb-item';

@Component({
  exportAs: 'sbItemHead',
  selector: 'mdb-item-head',
  templateUrl: 'sb-item.head.html'
})
export class SBItemHeadComponent {

  constructor(private sbItem: SBItemComponent) {}

  toggleClick(event: any) {
    event.preventDefault();
    this.sbItem.collapsed = !this.sbItem.collapsed;
    this.sbItem.toggle(this.sbItem.collapsed);
  }
}
