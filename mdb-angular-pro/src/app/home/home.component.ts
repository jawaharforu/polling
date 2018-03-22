import { Component, OnInit, ViewChild } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Meta, Title } from '@angular/platform-browser';
import { VoteduserService } from '../services/voteduser.service';
import { ResultService } from '../services/result.service';
import { ModalDirective } from '../typescripts/free';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pollList: any;
  polloption: any[] = [];
  jsonval: any;
  voterid: String;
  voteBtn: any[] = [];
  voted: any;
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  public isModalShown: Boolean = false;

  // chart start
  public chartType: String = 'bar';

    public chartDatasets: Array<any> = [
        {data: [65], label: 'My First dataset'},
        {data: [28], label: 'My Second dataset'},
        {data: [40], label: 'My Third dataset'}
    ];

    public chartLabels: Array<any> = ['Jan'];



    public chartOptions: any = {
        responsive: true
    };

    public chartClicked(): void {

    }

    public chartHovered(): void {

    }

    // chart end

  constructor(
    private pollService: PollService,
    private voteduserService: VoteduserService,
    private resultService: ResultService,
    meta: Meta,
    title: Title
  ) {
    title.setTitle('NATION PULSE');

    meta.addTags([
      { name: 'author',   content: 'Coursetro.com'},
      { name: 'keywords', content: 'angular seo, angular 4 universal, etc'},
      { name: 'description', content: 'This is my Angular SEO-based App, enjoy it!' }
    ]);
   }

  ngOnInit() {
    this.pollService.getIpAddress()
    .subscribe(data => {
      this.jsonval = data;
    });
    this.pollService.getPollByStatusHome()
    .subscribe(data => {
      let i = 1;
      for (const prop of data.data) {
        const btnid = {}
        btnid[prop._id] = true;
        this.voteBtn.push( btnid );
        if (i === data.data.length) {
          this.pollList = data.data;
        }
        i++;
      }
    });
  }

  putVote(pollId, i) {
    if (this.polloption[pollId] === undefined) {
      alert('Select Option');
      return false;
    }

    const jsonip = JSON.parse(this.jsonval._body);
    const newVoteduser = {
      ip: jsonip.query,
      userdetail: jsonip
    }
    this.voteduserService.addVoteduser(newVoteduser)
    .subscribe(data => {
      this.voterid = data.data._id;
      const newResult = {
        pollid: pollId,
        voteduserid: this.voterid,
        votedto: this.polloption[pollId]
      }
      this.resultService.addResult(newResult)
      .subscribe(data => {
        this.voteBtn[i][pollId] = false;
        this.voted = data.data;
        this.isModalShown = true;
      });
    });
  }

  public showModal(): void {
      this.isModalShown = true;
  }

  public hideModal(): void {
      this.autoShownModal.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
  }

}
