import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-us-manage',
  templateUrl: './contact-us-manage.component.html',
  styleUrls: ['./contact-us-manage.component.scss']
})
export class ContactUsManageComponent implements OnInit {

  contactlist: any;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contactService.getContact('contactus')
    .subscribe(data => {
      this.contactlist = data.data;
    });
  }

  deleteContact(contactid) {
    this.contactService.deleteContact(contactid)
    .subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.contactlist = data.data;
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
