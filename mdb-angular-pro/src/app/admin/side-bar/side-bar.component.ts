import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  user: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit() {
    
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['']);
    return false;
  }

}
