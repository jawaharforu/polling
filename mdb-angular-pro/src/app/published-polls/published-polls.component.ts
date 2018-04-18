import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from '../typescripts/free';
import { ResultService } from '../services/result.service';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-published-polls',
  templateUrl: './published-polls.component.html',
  styleUrls: ['./published-polls.component.scss']
})
export class PublishedPollsComponent implements OnInit {

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
    private pollService: PollService,
  ) {
    this.pollService.getPollByResult()
    .subscribe(data => {
      this.pollListing = data.data;
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
        this.chartDatasets = [];
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
