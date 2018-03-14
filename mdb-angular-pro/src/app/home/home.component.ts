import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { PollService } from '../services/poll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pollList: any;
  polloption: any[] = [];

  constructor(
    //private categoryService: CategoryService,
    private pollService: PollService
  ) { }

  ngOnInit() {
    this.pollService.getIpAddress().subscribe(data => {
      console.log(data);
    });
    this.pollService.getTruePoll()
    .subscribe(data => {
      this.pollList = data.data;
    });
  }

  putVote(pollId) {
    console.log(pollId);
    console.log(this.polloption[pollId]);
  }

}
