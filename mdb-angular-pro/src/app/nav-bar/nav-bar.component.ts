import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from '../typescripts/free';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  isModalShown: Boolean = false;
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { 
    this.user = JSON.parse(localStorage.getItem('user'));
  }

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

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['']);
    return false;
  }
}
