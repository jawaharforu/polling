import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from '../typescripts/free';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  isModalShown: Boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
      this.autoShownModal.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
  }
}
