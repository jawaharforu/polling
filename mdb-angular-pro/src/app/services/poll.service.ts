import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PollService {

  link: String = 'http://localhost:3000/';
  constructor(
    private http: Http
  ) { }

  getPoll() {
    const headers = new Headers(); 
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/polls/polls', {headers: headers})
    .map(res => res.json());
  }
  addPoll(newPoll) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/polls/poll', newPoll, {headers: headers})
    .map(res => res.json());
  }
  updatePoll(pollid, updatePoll) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/polls/poll/' + pollid, updatePoll, {headers: headers})
    .map(res => res.json());
  }
  deletePoll(pollid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.link + 'api/polls/poll/' + pollid, {headers: headers})
    .map(res => res.json());
  }
  getTruePoll() {
    const headers = new Headers(); 
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/polls/pollstatus', {headers: headers})
    .map(res => res.json());
  }
  getPollByStatusHome() {
    const headers = new Headers(); 
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/polls/pollstatushome', {headers: headers})
    .map(res => res.json());
  }
  // Get IP Adress using http://freegeoip.net/json/?callback
  getIpAddress() {
    const headers = new Headers();
    return this.http.get('http://ip-api.com/json', {headers: headers})
    .map(response => response || {});
  }
  // get ip detail
  getIpDetail(ip) {
    return this.http.get('http://ip-api.com/json/' + ip)
    .map(response => response || {});
  }

  upload(fileToUpload: any) {
    const input = new FormData();
    input.append('file', fileToUpload);

    return this.http
        .post(this.link + 'upload', input);
}

}
