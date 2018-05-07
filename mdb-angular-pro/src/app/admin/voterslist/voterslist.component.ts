import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-voterslist',
  templateUrl: './voterslist.component.html',
  styleUrls: ['./voterslist.component.scss']
})
export class VoterslistComponent implements OnInit {

  votersList: any;

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.userService.getAllVotedUser()
    .subscribe(data => {
      this.votersList = data.data;
      this.spinnerService.hide();
    });
  }

}
