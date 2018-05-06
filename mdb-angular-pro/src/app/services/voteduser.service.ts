import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LinkService } from './link.service';

@Injectable()
export class VoteduserService {

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

  addVoteduser(newVoteduser) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/votedusers/voteduser', newVoteduser, {headers: headers})
    .map(res => res.json());
  }

  updateVoteduser(voterid, updateVoteduser) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/votedusers/voteduser/' + voterid, updateVoteduser, {headers: headers})
    .map(res => res.json());
  }
  getVotersList() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/votedusers/voteduser', {headers: headers})
    .map(res => res.json());
  }

}
