import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-media-inquires',
  templateUrl: './media-inquires.component.html',
  styleUrls: ['./media-inquires.component.scss']
})
export class MediaInquiresComponent implements OnInit {

  constructor(
    meta: Meta,
    title: Title,
  ) { 
    title.setTitle('Nation	Pulse:	Poll	Reports,	Analytics	&	Intelligence	Data:	The	Beat	Of	The	Country	– Nation	Pulse');

    meta.addTags([
        { name: 'author',   content: 'www.nationpulse.in'},
        // tslint:disable-next-line:max-line-length
        { name: 'keywords', content: 'Polling	data,	opinion	polls,	analytics,	election	data,	political	polls,	breaking	polls,	trending	polls,	general	elections	india,	assembly elections,	Karnataka	elections,	voter	demography, voter	behavior,'},
        { name: 'description', content: 'Reports	and	polling	data	on	all	things	that	matter.	Opinions	collected	on	topics ranging	from	politics,	education,	business	to	entertainment	and	sports.	Get	access	to our	rich	archive	of	data' }
      ]);
    }

  ngOnInit() {
  }

}
