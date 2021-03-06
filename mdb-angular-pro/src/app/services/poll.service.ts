import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LinkService } from './link.service';

@Injectable()
export class PollService {

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

  getPoll() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/polls/polls', {headers: headers})
    .map(res => res.json());
  }
  getPollById(pid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/polls/poll/' + pid, {headers: headers})
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
  // http://gd.geobytes.com/GetCityDetails
  getIpAddress() {
    const headers = new Headers();
    return this.http.get('https://api.ipify.org/?format=json', {headers: headers})
    .map(response => response || {});
  }
  // get ip detail
  getIpDetail(ip) {
    // const headers = new Headers({
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //   'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    //   'Access-Control-Allow-Credentials': true
    // });
    // return this.http.get('//api.ip2location.com/?ip=' + ip + '&key=0FF79BE7E0&package=WS3')
    // .map(response => response);
    return this.http.get(this.link + 'api/polls/ipdetail/' + ip )
    .map(res => res.json());
  }

  upload(fileToUpload: any) {
    const input = new FormData();
    input.append('file', fileToUpload);

    return this.http
        .post(this.link + 'upload', input);
  }

  getPollByCategory(categoryid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/polls/pollcategory/' + categoryid, {headers: headers})
    .map(res => res.json());
  }

  getPollByPollCategory(categoryid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/polls/pollcategories/' + categoryid, {headers: headers})
    .map(res => res.json());
  }

  getPollByResult() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/polls/pollstatusresult', {headers: headers})
    .map(res => res.json());
  }

}
