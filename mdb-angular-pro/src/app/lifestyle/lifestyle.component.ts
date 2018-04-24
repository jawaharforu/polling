import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss']
})
export class LifestyleComponent implements OnInit {

  constructor(
    meta: Meta,
    title: Title,
  ) { 
    // tslint:disable-next-line:max-line-length
    title.setTitle('Nation Pulse Lifestyle Polls: Lifestyle Polls That Shed A Light On The Choices Of The People Of The Country');

    meta.addTags([
        { name: 'author',   content: 'www.nationpulse.in'},
        // tslint:disable-next-line:max-line-length
        { name: 'keywords', content: 'Lifestyle polls, living styles, choices of people, wants of people, people’s opinion, lifestyle of Indians, stats, how Indians live, peoples’ choice, what Indians like, India’s choice, life choices of indians'},
        { name: 'description', content: 'Get to know the lifestyle choices of the citizens of the country. Helping policy makers and every business leader to bring out programs that give citizens a better living environment, thus enriching their lifestyles.' }
      ]);
  }

  ngOnInit() {
  }

}
