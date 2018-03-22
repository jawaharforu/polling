import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserService } from '../../services/user.service';
import { PollService } from '../../services/poll.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-poll-assign',
  templateUrl: './poll-assign.component.html',
  styleUrls: ['./poll-assign.component.scss']
})
export class PollAssignComponent implements OnInit {

  userDetail: any;
  pollList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private pollService: PollService,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const userid = params['id']
      this.userService.getUserById(userid)
      .subscribe(data => {
        this.userDetail = data.data;
        this.pollService.getPoll()
        .subscribe(data => {
          this.pollList = data.data;
        });
      });
    });
  }

  isSelected(pid) {
    return this.userDetail.polls.indexOf(pid) >= 0;
  }
  
  remove(array, element) {
    return array.filter(e => e !== element);
  }

  assignTo(event, pid) {
    if (event) {
      this.userDetail.polls.push(pid);
    } else {
      this.userDetail.polls = this.remove(this.userDetail.polls, pid);
    }
    const polls = {
      polls: this.userDetail.polls
    }
    this.userService.assignUser(this.userDetail._id, polls)
    .subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
