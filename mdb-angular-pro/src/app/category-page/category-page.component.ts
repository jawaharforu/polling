import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import {ActivatedRoute} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { PollService } from '../services/poll.service';
import { ModalDirective } from '../typescripts/free';
import { VoteduserService } from '../services/voteduser.service';
import { ResultService } from '../services/result.service';
import {ToastService} from '../typescripts/pro/alerts';
import { ValidationService } from '../services/validation.service';
import { UserService } from '../services/user.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  categorySlug: any;
  @Input()  nav: Boolean;
  navbar: Boolean;
  pollListing: any;
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown: Boolean = false;
  votingPoll: any;
  polloption: any[] = [];
  jsonval: any;
  mobile: String = '';
  email: String;
  mobilenum: String = '';
  emailnum: String = '';
  @Input() searchvalue: String = '';
  voterid: any;
  voted: any;
  ipdetail: any;
  state: any;
  region: any;
  user: any;
  pollListFull: any;
  publishdate: String = 'later';
  // chart start
  chartDisplay: Boolean = true;
  resform: Boolean = true;
  pollform: Boolean = true;

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
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    meta: Meta,
    title: Title,
    private pollService: PollService,
    private voteduserService: VoteduserService,
    private resultService: ResultService,
    private userService: UserService,
    private toast: ToastService,
    private validationService: ValidationService,
    private spinnerService: Ng4LoadingSpinnerService,
  ) {
    this.spinnerService.show();
    this.pollService.getIpAddress()
    .subscribe(data => {
      this.jsonval = data;
      const getip = JSON.parse(this.jsonval._body);
      this.pollService.getIpDetail(getip.ip)
      .subscribe(data => {
        // console.log(data.data);
        this.ipdetail = data;
        const reg = this.ipdetail.data.split(';');
        this.state = reg[2];
        this.region = reg[3];
      });
    });
    this.activatedRoute.params.subscribe((params) => {
      const slug = params['slug']
      this.categoryService.getCategorySlug(slug)
      .subscribe(data => {
        this.categorySlug = data.data;
        title.setTitle(this.categorySlug.title);
        meta.addTags([
          { name: 'author',   content: 'Coursetro.com' },
          { name: 'keywords', content: this.categorySlug.description },
          { name: 'description', content: this.categorySlug.description }
        ]);
        this.pollService.getPollByCategory(this.categorySlug._id)
        // tslint:disable-next-line:no-shadowed-variable
        .subscribe(data => {
          this.pollListing = data.data;
          this.spinnerService.hide();
        });
      });
    });
 
    this.userService.getLoggedInUser().then((res) => {
      this.user = res;
      if ( this.user ) {
        this.mobilenum = this.user.mobile;
      }
    });
  }

  ngOnInit() {
    this.navbar = (this.nav === false) ? false : true;
    this.pollService.getPoll()
    .subscribe(data => {
      this.pollListFull = data.data;
    });
  }
 
  putVote(pollId, p) {

    if (this.polloption[pollId] === undefined) {
      this.toast.error('Select Option');
      return false;
    }
    this.spinnerService.show();
    const jsonip = JSON.parse(this.jsonval._body);
    let newVoteduser;
    if (this.mobilenum === '') {
      newVoteduser = {
        ip: jsonip.ip,
        userdetail: jsonip,
        mobile: '',
        fullderail: this.ipdetail.data,
        state: this.state,
        region: this.region,
      }
    } else {
      newVoteduser = {
        ip: jsonip.ip,
        userdetail: jsonip,
        mobile: this.mobilenum,
        fullderail: this.ipdetail.data,
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
        region: this.region,
      }
      this.resultService.addResult(newResult)
      .subscribe(data => {
        this.voted = data.data;
        let j = 1;
        for (const prop of data.data) {
          this.chartDatasets.push({data: [prop.voteCount], label: prop.option});
          if (j === data.data.length) {
            if ( p.categoryname[0].name === 'Politics' ) {
              if ( new Date(p.todate) <=  new Date(Date.now()) ) {
                this.chartDisplay = true;
              } else {
                const date = new Date(p.todate);
                this.publishdate = date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate();
                this.chartDisplay = false;
              }
            } else {
              this.chartDisplay = p.result
            }
            if (this.mobilenum === '') {
              this.pollform = false;
            } else {
              this.pollform = false;
              this.resform = false;
            }
          }
          j++;
        }
        this.spinnerService.hide();
      });
    });
  }

  showPoll(p) {
    this.votingPoll = p;
    this.showModal();
  }

  public showModal(): void {
      this.isModalShown = true;
  }

  public hideModal(): void {
      this.autoShownModal.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
      this.resform = true;
      this.pollform = true;
  }

  updateVoter() {
    const updateVoteduser = {
      name: '',
      mobile: this.mobile,
      email: this.email
    }
    if (this.mobile === undefined || this.email === undefined || this.mobile === '') {
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
          this.emailnum = this.email;
          this.resform = false;
      }
    });
  }

}
