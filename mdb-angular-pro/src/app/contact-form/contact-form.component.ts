import { Component, OnInit, Input } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ContactService } from '../services/contact.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  name: String;
  phone: String;
  organization: String;
  email: String;
  message: String;
  understand: Boolean;
  store: Boolean;
  @Input()  type: String;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
  }

  addContact() {
    // tslint:disable-next-line:max-line-length
    if (this.name === undefined || this.phone === undefined || this.email === undefined || this.understand === undefined || this.store === undefined) {
      this._flashMessagesService.show('Please fill all the mandatory fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    const contact = {
      name: this.name,
      phone: this.phone,
      organization: this.organization,
      email: this.email,
      message: this.message,
      understand: this.understand,
      store: this.store,
      type: this.type
    };
    this.contactService.addContact(contact)
    .subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.name = '';
        this.phone = '';
        this.organization = '';
        this.email = '';
        this.message = '';
        this.understand = undefined;
        this.store = undefined;
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    })
  }

}
