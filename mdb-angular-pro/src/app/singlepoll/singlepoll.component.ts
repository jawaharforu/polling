import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PollService } from '../services/poll.service';
import { ModalDirective } from '../typescripts/free';
import { VoteduserService } from '../services/voteduser.service';
import { ResultService } from '../services/result.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-singlepoll',
  templateUrl: './singlepoll.component.html',
  styleUrls: ['./singlepoll.component.scss']
})
export class SinglepollComponent implements OnInit {
  pollList: any;
  voteBtn: any[] = [];
  polloption: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private pollService: PollService,
    private voteduserService: VoteduserService,
    private resultService: ResultService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) { 
    this.spinnerService.show();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const pollid = params['pollid'];
      this.pollService.getPollById(pollid)
      .subscribe(data => {
        this.pollList = data.data;
        const btnid = {}
        btnid[this.pollList[0]._id] = true;
        this.voteBtn.push( btnid );
        this.spinnerService.hide();
      });
    });
  }
  

}
