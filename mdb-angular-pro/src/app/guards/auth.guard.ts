import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServices } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private authService: AuthServices, private router: Router) {

  }
  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
