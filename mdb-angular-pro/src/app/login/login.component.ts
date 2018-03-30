import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mobile: Number;
  password: String;

  constructor(
    private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      mobile: this.mobile,
      password: this.password
    }
    if (user.mobile === undefined || user.password === '') {
      this._flashMessagesService.show('Fields should not be empty!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.authService.authenticateUser(user).subscribe(data => {
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
          this._flashMessagesService.show('You are now logged in', {cssClass: 'alert-success', timeout: 3000});
          // this.router.navigate(['admin']);
          this.router.navigate(['/admin', {outlets: {'adminchild': ['pollmanage']}}]);
        } else {
          this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
    });
  }
}
