import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from '../../typescripts/free';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  userList: any;
  public isModalShown: Boolean = false;
  userCreateForm: FormGroup;
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private userService: UserService,
    private validationService: ValidationService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.userCreateForm = this._fb.group({
      name: this._fb.control(null),
      mobile: this._fb.control(null),
      email: this._fb.control(null),
      password: this._fb.control(null),
      userid: this._fb.control(null)
    });
    this.userService.getAllUser()
    .subscribe(data => {
      this.userList = data.data;
    });
  }

  public showModal(u): void {
    this.userCreateForm.setValue({
      name: u.name,
      mobile: u.mobile,
      email: u.email,
      password: u.password,
      userid: u._id
    });
    this.isModalShown = true;
  }

  public hideModal(): void {
      this.autoShownModal.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
  }

  updateFunction(userid, user) {
    this.userService.updateUser(userid, user)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.userList = data.data;
          this.userCreateForm.reset();
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
    });
  }

  updateUser() {
    const userid = this.userCreateForm.value.userid
    const user = {
      name: this.userCreateForm.value.name,
      email: this.userCreateForm.value.email,
      mobile: this.userCreateForm.value.mobile,
      role: 'paid'
    }
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
    this.updateFunction(userid, user);
    this.hideModal();
  }
}
