import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LinkService } from './link.service';

@Injectable()
export class UserService {

  // link: String = 'http://localhost:3000/';
  link: String;
  authToken: any;
  user: any;

  constructor(
    private http: Http,
    private linkService: LinkService
  ) {
    this.link = this.linkService.link;
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.link + 'api/users/register', user, {headers: headers})
      .map(res => res.json());
  }
  getAllUser() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.link + 'api/users/users', {headers: headers})
      .map(res => res.json());
  }
  getAllVotedUser() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.link + 'api/users/votedusers', {headers: headers})
      .map(res => res.json());
  }
  updateUser(userid, updateUser) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/users/user/' + userid, updateUser, {headers: headers})
    .map(res => res.json());
  }
  getUserById(uid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.link + 'api/users/users/' + uid, {headers: headers})
      .map(res => res.json());
  }
  assignUser(userid, updateUser) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/users/userassign/' + userid, updateUser, {headers: headers})
    .map(res => res.json());
  }
  passwordMatch(pass) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.link + 'api/users/passwordcheck', pass, {headers: headers})
      .map(res => res.json());
  }
  updateUserPassword(userid, updateUser) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/users/userpassword/' + userid, updateUser, {headers: headers})
    .map(res => res.json());
  }
  getUserWithPoll(uid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.link + 'api/users/userpoll/' + uid, {headers: headers})
      .map(res => res.json());
  }
  getLoggedInUser() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('user')));
    });
  }
}
