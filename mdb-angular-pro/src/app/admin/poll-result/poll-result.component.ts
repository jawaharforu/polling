import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PollService } from '../../services/poll.service';
import { ResultService } from '../../services/result.service';
import { ModalDirective } from '../../typescripts/free';

@Component({
  selector: 'app-poll-result',
  templateUrl: './poll-result.component.html',
  styleUrls: ['./poll-result.component.scss']
})
export class PollResultComponent implements OnInit {

  pollData: any;
  piechart: Boolean = false;
  totalPoll: String;
  statewiselist: any;
  pollId: String;
  regionwiselist: any;
  userwiselist: any;
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown: Boolean = false;
  public isModalShownuser: Boolean = false;
  // chart start
  public chartType: String = 'pie';

  public chartData: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [{
      hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
      hoverBorderWidth: 0,
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774']
  }];

  public chartOptions: any = {
      responsive: true
  };

  public chartClicked(e): void {
    console.log(e);
  }

  public chartHovered(): void {

  }
  // chart end
  constructor(
    private activatedRoute: ActivatedRoute,
    private pollService: PollService,
    private resultService: ResultService,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const pollid = params['id']
      this.pollId = pollid;
      this.pollService.getPollById(pollid)
      .subscribe(data => {
        this.pollData = data.data;
      });
      this.resultService.getResult(pollid)
      .subscribe(data => {
        let j = 1;
        for (const prop of data.data) {
          this.chartData.push(prop.voteCount);
          this.chartLabels.push(prop.option);
          if (j === data.data.length) {
            this.piechart = true;
            this.totalPoll = this.chartData.reduce((a, b) => a + b, 0);
          }
          j++;
        }
      });
      this.resultService.getResultState(pollid)
      .subscribe(data => {
        this.statewiselist = data.data
      });
    });
   }

  ngOnInit() {
  }

  getRegionWise(state) {
    this.showModal(state);
  }
  public showModal(state): void {
    this.resultService.getResultregion(this.pollId, state)
    .subscribe(data => {
      this.regionwiselist = data.data;
      this.isModalShown = true;
    });
  }

  getUserWise() {
    this.resultService.getUserPolls(this.pollId)
    .subscribe(data => {
      this.userwiselist = data.data;
      this.isModalShownuser = true;
    });
  }

  public hideModal(): void {
      this.autoShownModal.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
  }

}
