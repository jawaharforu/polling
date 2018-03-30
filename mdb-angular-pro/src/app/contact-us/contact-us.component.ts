import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(
    meta: Meta,
    title: Title,
  ) { 
    title.setTitle('Nation	Pulse:	Polls,	Analytics	&	Intelligence – Nation	Pulse');

    meta.addTags([
        { name: 'author',   content: 'www.nationpulse.in'},
        // tslint:disable-next-line:max-line-length
        { name: 'keywords', content: 'Reports,	stats,	opinion	polls,	elections	in	india,	politics,	entertainment,	sports,	education, analytics,	intelligence	reports,	polls,'},
        { name: 'description', content: 'The	pulse	of	the	nation	on	topics	ranging	from	politics,	education,	business	to entertainment	and	sports.	Opinions,	trends,	intelligence	reports.	Contact	us	for	reports,	stats	and	information' }
      ]);
  }

  ngOnInit() {
  }

}
