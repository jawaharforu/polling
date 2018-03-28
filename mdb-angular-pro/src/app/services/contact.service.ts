import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  link: String = 'http://localhost:3000/';
  constructor(
    private http: Http
  ) { }

  getContact(type) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/contacts/contactform/' + type, {headers: headers})
    .map(res => res.json());
  }

  addContact(newContact) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/contacts/contact', newContact, {headers: headers})
    .map(res => res.json());
  }

  deleteContact(contactid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.link + 'api/contacts/contact/' + contactid, {headers: headers})
    .map(res => res.json());
  }

}
