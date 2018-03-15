import { Component, OnInit } from '@angular/core';
//import { CategoryService } from '../services/category.service';
import { PollService } from '../services/poll.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pollList: any;
  polloption: any[] = [];
  jsonval: any;

  constructor(
    //private categoryService: CategoryService,
    private pollService: PollService,
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
    this.pollService.getIpAddress().subscribe(data => {
      //console.log(JSON.stringify(data));
      this.jsonval = JSON.parse(data._body);
    });
    this.pollService.getPollByStatusHome()
    .subscribe(data => {
      this.pollList = data.data;
    });
  }

  putVote(pollId) {
    console.log(pollId);
    console.log(this.polloption[pollId]);
  }

}
