import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-np-intelligence',
  templateUrl: './np-intelligence.component.html',
  styleUrls: ['./np-intelligence.component.scss']
})
export class NpIntelligenceComponent implements OnInit {

  constructor(
    meta: Meta,
    title: Title,
  ) { 
    // tslint:disable-next-line:max-line-length
    title.setTitle('Nation	Pulse	Intelligence:	Know	Your	Voters,	Customers,	Audiences:	Comprehensive	&	Critical Intelligence	Reports	– Nation	Pulse');

    meta.addTags([
        { name: 'author',   content: 'www.nationpulse.in'},
        // tslint:disable-next-line:max-line-length
        { name: 'keywords', content: 'Voter	intelligence,	voting	patterns	in	elections,	opinion	polls,	indian	elections,	parliament	elections,	state	assembly	elections,	election	issues,	voters information,	election	data,	stats,	brand	survey'},
        { name: 'description', content: 'Get	in	touch	to	gain	in-depth	knowledge	on	voters,	customers	&	audiences.	Data	is	sourced	from	constituencies	and	from	a	vast	demography	to	give	invaluable	inputs	on	voter	behavior.' }
      ]);
  }

  ngOnInit() {
  }

}
