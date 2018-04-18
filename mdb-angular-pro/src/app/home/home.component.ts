import { Component, OnInit, ViewChild } from '@angular/core';
import { PollService } from '../services/poll.service';
import { Meta, Title } from '@angular/platform-browser';
import { VoteduserService } from '../services/voteduser.service';
import { ResultService } from '../services/result.service';
import { ModalDirective } from '../typescripts/free';
import {ToastService} from '../typescripts/pro/alerts';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../services/user.service';


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
  mobile: String;
  email: String;
  mobilenum: String = '';
  piechart: Boolean = false;
  ipdetail: any;
  state: any;
  region: any;
  user: any;

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown: Boolean = false;
  public isModalForUser: Boolean = false;
  public repoUrl = window.location.protocol + '//' + window.location.host;
  // chart start
  pieChartData =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {'title': 'Tasks'},
  };
  chartDisplay: Boolean = true;

  public chartType: String = 'bar';

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = ['Result'];

  public chartColors: Array<any> = [];

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
    private userService: UserService,
    meta: Meta,
    title: Title,
    private toast: ToastService,
    private validationService: ValidationService,
  ) {
    title.setTitle('NATION PULSE');

    meta.addTags([
      { name: 'author',   content: 'Coursetro.com'},
      { name: 'keywords', content: 'angular seo, angular 4 universal, etc'},
      { name: 'description', content: 'This is my Angular SEO-based App, enjoy it!' }
    ]);
    this.userService.getLoggedInUser().then((res) => {
      if (res) {
        this.user = res;
        this.mobilenum = this.user.mobile;
      }
    });
   }

  ngOnInit() {
    this.pollService.getIpAddress()
    .subscribe(data => {
      this.jsonval = data;
      // const getip = JSON.parse(this.jsonval._body);
      /*
      this.pollService.getIpDetail(getip.ip)
      .subscribe(data => {
        this.ipdetail = data;
        const reg = this.ipdetail._body.split(';');
        this.state = reg[2];
        this.region = reg[3];
      });
      */
     this.state = 'Karnataka';
     this.region = 'Bangalore';
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

  putVote(pollId, i, p) {
    if (this.polloption[pollId] === undefined) {
      alert('Select Option');
      return false;
    }

    const jsonip = JSON.parse(this.jsonval._body);
    let newVoteduser;
    if (this.mobilenum === '') {
      newVoteduser = {
        ip: jsonip.ip,
        userdetail: jsonip,
        mobile: '',
        // fullderail: this.ipdetail._body,
        state: this.state,
        region: this.region,
      }
    } else {
      newVoteduser = {
        ip: jsonip.ip,
        userdetail: jsonip,
        mobile: this.mobilenum,
        // fullderail: this.ipdetail._body,
        state: this.state,
        region: this.region,
      }
    }
    this.voteduserService.addVoteduser(newVoteduser)
    .subscribe(data => {
      this.voterid = data.data._id;
      const newResult = {
        pollid: pollId,
        voteduserid: this.voterid,
        votedto: this.polloption[pollId],
        state: this.state,
        region: this.region
      }
      this.chartDatasets = [];
      this.resultService.addResult(newResult)
      .subscribe(data => {
        if (data.success === true) {
          this.voteBtn[i][pollId] = false;
          this.voted = data.data;
          let j = 1;
          for (const prop of data.data) {
            this.chartDatasets.push({data: [prop.voteCount], label: prop.option});
            if (j === data.data.length) {
              if (this.mobilenum === '') {
              this.isModalForUser = true;
              } else {
                this.isModalShown = true;
              }
              this.chartDisplay = p.result
            }
            j++;
          }
        }
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

  public onHiddenuser(): void {
    this.isModalForUser = false;
  }

  updateVoter() {
    const updateVoteduser = {
      name: '',
      mobile: this.mobile,
      email: this.email
    }
    if (this.mobile === undefined || this.email === undefined) {
      this.toast.error('All Fields Required');
      return false;
    }
    if (!this.validationService.validateEmail(updateVoteduser.email)) {
      this.toast.error('Invalid Email');
      return false;
    }
    const mobilemsg = this.validationService.validateMobile(updateVoteduser.mobile);
    if (mobilemsg !== true) {
      this.toast.error(mobilemsg);
      return false;
    }
    this.voteduserService.updateVoteduser(this.voterid, updateVoteduser)
    .subscribe(data => {
      if (data.success) {
          this.mobilenum = this.mobile;
          this.isModalShown = true;
          this.isModalForUser = false;
      }
    });
  }
}
