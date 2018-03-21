import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidationService } from '../../services/validation.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userCreateForm: FormGroup;
  error: any;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private _fb: FormBuilder,
    private router: Router,
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
      password: this._fb.control('', [Validators.required, Validators.minLength(6)])
    });
  }

  addUser() {
    const user = {
      name: this.userCreateForm.value.name,
      email: this.userCreateForm.value.email,
      mobile: this.userCreateForm.value.mobile,
      password: this.userCreateForm.value.password,
      role: 'paid'
    }
    // Required Fields
    if (!this.validationService.validateRegister(user)) {
      this._flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
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

    // Register user
    this.userService.registerUser(user).subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show('User Is Created', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/admin', {outlets: {'adminchild': ['usermanage']}}]);
      } else {
        this._flashMessagesService.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

}
