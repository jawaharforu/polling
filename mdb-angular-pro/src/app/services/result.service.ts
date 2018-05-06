import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LinkService } from './link.service';

@Injectable()
export class ResultService {

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
  getResultState(pollid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/results/getoptionresult/' + pollid, {headers: headers})
    .map(res => res.json());
  }

  getResultregion(pollid, state) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/results/getoptionresultregion/' + pollid + '/' + state, {headers: headers})
    .map(res => res.json());
  }
  getPreviousPolls(mobile) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/results/getpreviouspolls/' + mobile, {headers: headers})
    .map(res => res.json());
  }
  getUserPolls(pollid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/results/getuserpolls/' + pollid, {headers: headers})
    .map(res => res.json());
  }
}
