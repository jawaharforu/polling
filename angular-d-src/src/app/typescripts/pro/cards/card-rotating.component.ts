import { Component } from '@angular/core';

@Component({
  selector: 'mdb-card-rotating',
  templateUrl: 'card-rotating.component.html'
})

export class CardRotatingComponent {
  public rotate = false;

  toggle() {
    this.rotate = !this.rotate;
  }
}
