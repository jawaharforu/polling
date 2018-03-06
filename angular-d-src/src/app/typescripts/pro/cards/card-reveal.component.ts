import { Component } from '@angular/core';
import { socialsState } from '../animations/animations.component';

@Component({
  selector: 'mdb-card-reveal',
  templateUrl: 'card-reveal.component.html',
  animations: [socialsState]
})

export class CardRevealComponent {
  public socials: any;
  public show: boolean;

  toggle() {
    this.show = !this.show;
    this.socials = (this.socials === 'active') ? 'inactive' : 'active';
  }
}
