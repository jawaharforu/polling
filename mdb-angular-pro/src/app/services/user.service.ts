import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  link: String = 'http://localhost:3000/';
  constructor(
    private http: Http
  ) { }

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
  updateUser(userid, updateUser) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/users/user/' + userid, updateUser, {headers: headers})
    .map(res => res.json());
  }
}
