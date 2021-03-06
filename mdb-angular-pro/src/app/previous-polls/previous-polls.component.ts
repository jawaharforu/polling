import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from '../typescripts/free';
import { ResultService } from '../services/result.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-previous-polls',
  templateUrl: './previous-polls.component.html',
  styleUrls: ['./previous-polls.component.scss']
})
export class PreviousPollsComponent implements OnInit {

  categorySlug: any;
  @Input()  nav: Boolean;
  navbar: Boolean;
  pollListing: any;
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown: Boolean = false;
  votingPoll: any;
  polloption: any[] = [];
  jsonval: any;
  mobile: String;
  email: String;
  mobilenum: String = '';
  emailnum: String = '';
  voterid: any;
  voted: any;
  ipdetail: any;
  state: any;
  region: any;
  user: any;
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
    private resultService: ResultService,
    private userService: UserService,
  ) {
    this.userService.getLoggedInUser().then((res) => {
      this.user = res;
      this.mobilenum = this.user.mobile;
      this.resultService.getPreviousPolls(this.mobilenum)
      .subscribe(data => {
        this.pollListing = data.data;
      });
    });
  }

  ngOnInit() {
    this.navbar = (this.nav === false) ? false : true;
  }

  showPoll(p) {
    this.votingPoll = p;
    this.resultService.getResult(p._id)
      .subscribe(data => {
        this.voted = data.data;
        let j = 1;
        for (const prop of data.data) {
          this.chartDatasets.push({data: [prop.voteCount], label: prop.option});
          if (j === data.data.length) {
            this.chartDisplay = p.result
            this.showModal();
          }
          j++;
        }
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
      this.resform = true;
      this.pollform = true;
  }

}
