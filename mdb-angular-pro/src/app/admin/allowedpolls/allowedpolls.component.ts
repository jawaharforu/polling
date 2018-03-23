import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-allowedpolls',
  templateUrl: './allowedpolls.component.html',
  styleUrls: ['./allowedpolls.component.scss']
})
export class AllowedpollsComponent implements OnInit {

  user: any;
  userdata: any;
  constructor(
    private userService: UserService
  ) {
     this.user = JSON.parse(localStorage.getItem('user'));
  }
  ngOnInit() {
    this.userService.getUserWithPoll(this.user.id)
      .subscribe(data => {
        this.userdata = data.data;
    });
    /*
    this.userService.getLoggedInUser()
    .then(value => {
      this.user = value;
      this.userService.getUserWithPoll(this.user.id)
      .subscribe(data => {
        this.userdata = data.data;
        console.log(this.userdata);
      });
    });
    */
  }
}
