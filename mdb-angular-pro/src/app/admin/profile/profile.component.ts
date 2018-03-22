import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { UserService } from '../../services/user.service';
import { ModalDirective } from '../../typescripts/free';
import {ToastService} from '../../typescripts/pro/alerts';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userCreateForm: FormGroup;
  user: any;
  userdata: any;
  passwordold: String;
  passwordnew: String;
  passwordre: String;
  public isModalShown: Boolean = false;
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private _fb: FormBuilder,
    private validationService: ValidationService,
    private userService: UserService,
    private toast: ToastService
  ) {
    this.userdata = JSON.parse(localStorage.getItem('user'));
    this.userCreateForm = this._fb.group({
      name: this._fb.control('', Validators.required),
      mobile: this._fb.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]+')
      ]),
      email: this._fb.control('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')])
    });
  }

  ngOnInit() {
    this.userService.getUserById(this.userdata.id)
      .subscribe(data => {
        this.user = data.data;
        this.userCreateForm.setValue({
          name: this.user.name,
          mobile: this.user.mobile,
          email: this.user.email
        });
    });
  }

  updateFunction(userid, userupdate) {
    this.userService.updateUser(userid, userupdate)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
    });
  }

  updateUser() {
    const userid = this.user._id;
    const userupdate = {
      name: this.userCreateForm.value.name,
      email: this.userCreateForm.value.email,
      mobile: this.userCreateForm.value.mobile,
      role: this.user.role
    }
    if (!this.validationService.validateRegister(userupdate)) {
      this._flashMessagesService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if (!this.validationService.validateEmail(userupdate.email)) {
      this._flashMessagesService.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    const mobilemsg = this.validationService.validateMobile(userupdate.mobile);
    if (mobilemsg !== true) {
      this._flashMessagesService.show(mobilemsg, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.updateFunction(userid, userupdate);
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

  updateUserPassword() {
    if (this.passwordnew === undefined || this.passwordre === undefined || this.passwordold === undefined) {
      this.toast.error('All Fields Required');
      return false;
    }
    if ( this.passwordnew !== this.passwordre ) {
      this.toast.error('Password Not Matching');
      return false;
    } else {
      const pass = {
        oldpassword: this.passwordold,
        newpassword: this.passwordnew
      }
      this.userService.passwordMatch(pass)
      .subscribe(data => {
        if (data.success) {
          const password = {
            password: this.passwordnew
          }
          this.userService.updateUserPassword(this.user._id, password)
          .subscribe(data => {
            if (data.success) {
              this.passwordold = '';
              this.passwordnew = '';
              this.passwordre = '';
              this._flashMessagesService.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
            } else {
              this._flashMessagesService.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
            }
            this.hideModal();
          });
        } else {
          this.toast.error('Old Password Is Not Matching');
        }
      });
    }
  }

}
