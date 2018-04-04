import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mobile: Number;
  password: String;
  show: Boolean = true;
  userCreateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private _flashMessagesService: FlashMessagesService,
    private router: Router,
    private _fb: FormBuilder,
    private validationService: ValidationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userCreateForm = this._fb.group({
      name: this._fb.control('', Validators.required),
      mobile: this._fb.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]+')
      ]),
      email: this._fb.control('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      password: this._fb.control('', [Validators.required, Validators.minLength(6)]),
      passwordre: this._fb.control('', [Validators.required, Validators.minLength(6)])
    });
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
          if (data.user.role === 'users') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/admin', {outlets: {'adminchild': ['pollmanage']}}]);
          }
        } else {
          this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        }
    });
  }

  addUser() {
    const user = {
      name: this.userCreateForm.value.name,
      email: this.userCreateForm.value.email,
      mobile: this.userCreateForm.value.mobile,
      password: this.userCreateForm.value.password,
      role: 'users'
    }
    // Required Fields
    if (!this.validationService.validateRegister(user)) {
      this._flashMessagesService.show('Please fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if (!this.validationService.validateEmail(user.email)) {
      this._flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    const mobilemsg = this.validationService.validateMobile(user.mobile);
    if (mobilemsg !== true) {
      this._flashMessagesService.show(mobilemsg, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (user.password.length < 5) {
      this._flashMessagesService.show('Password should have min 6 char', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (user.password !== this.userCreateForm.value.password) {
      this._flashMessagesService.show('Password Not Matching', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register user
    this.userService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('User Is Created Please login now.', {cssClass: 'alert-success', timeout: 3000});
        this.userCreateForm.setValue({
          name: '',
          email: '',
          mobile: '',
          password: '',
          passwordre: ''
        });
        this.show = true;
      } else {
        this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }
}
