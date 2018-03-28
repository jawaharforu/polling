import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-np-intelligence-manage',
  templateUrl: './np-intelligence-manage.component.html',
  styleUrls: ['./np-intelligence-manage.component.scss']
})
export class NpIntelligenceManageComponent implements OnInit {

  contactlist: any;

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contactService.getContact('npintelligence')
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
