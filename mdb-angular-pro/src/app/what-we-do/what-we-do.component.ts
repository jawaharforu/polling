import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-what-we-do',
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent implements OnInit {

  constructor(
    meta: Meta,
    title: Title,
  ) { 
    // tslint:disable-next-line:max-line-length
    title.setTitle('Nation	Pulse:	Polls,	Analytics	&	intelligence:	Shape your	decision-making	strategy	– Nation	Pulse');

    meta.addTags([
        { name: 'author',   content: 'www.nationpulse.in'},
        // tslint:disable-next-line:max-line-length
        { name: 'keywords', content: 'Opinion	polls,	political	polls,	karnataka	assembly	elections,	voter	behavior,	voter	analytics,	poll	data,	political	survey	firms,	election	data,	election	issues,	india	election	reports,	general	election	india,	state	elections,	stats,	movies,	sports,	tv,	celebrities,	education,	business,	entertainment,	voter	behavior, voting	patterns	in	elections,'},
        { name: 'description', content: 'Advice	about	everything	that	matters.	Shape	your	decision-making	strategy	with	access	to	data	that	is	sourced	from	a	targeted	audience.	We	gather	the	opinions	of	voters,	customers,	youth,	audiences and	citizens	on	a	wide	range	of	issues.	Make	better	decisions	by	accessing	the	data	from	our	polls	or	make	a	custom	poll	with	your	questions.' }
      ]);
  }

  ngOnInit() {
  }

}
