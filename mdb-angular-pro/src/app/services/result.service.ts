import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResultService {

  link: String = 'http://localhost:3000/';
  constructor(
    private http: Http
  ) { }

  addResult(newResult) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/results/result', newResult, {headers: headers})
    .map(res => res.json());
  }
  getResult(pollid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/results/getresult/' + pollid, {headers: headers})
    .map(res => res.json());
  }
}
