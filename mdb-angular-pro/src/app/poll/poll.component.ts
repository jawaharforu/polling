import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  @Output() searchvalue: String = '';
  constructor() { }

  ngOnInit() {
  }

}
