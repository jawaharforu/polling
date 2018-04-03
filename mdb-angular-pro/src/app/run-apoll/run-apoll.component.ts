import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-run-apoll',
  templateUrl: './run-apoll.component.html',
  styleUrls: ['./run-apoll.component.scss']
})
export class RunApollComponent implements OnInit {

  constructor(
    meta: Meta,
    title: Title,
  ) { 
    // tslint:disable-next-line:max-line-length
    title.setTitle('Nation Pulse Polls: Critical Election Data That Will Help Shape Winning Campaign Strategy – Nation Pulse');

    meta.addTags([
        { name: 'author',   content: 'www.nationpulse.in'},
        // tslint:disable-next-line:max-line-length
        { name: 'keywords', content: 'Voter demography in india, voter patterns, election campaigns, winning elections, voter data, constituency wise election data, opinion polls, election polls, election news, election wave, stats, voting patterns in elections, analysis,'},
        { name: 'description', content: 'In-depth analysis on voter patterns with data sourced from a targeted and wide range of demography that gives invaluable insights to help shape wining election strategies.' }
      ]);
  }

  ngOnInit() {
  }

}
