import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  pollname: String;
  pollType: Array<any>;
  selectedPollType: String;
  pollStatus: Boolean;
  pollTrending: Boolean;
  pollCategoryid: String;
  pollOption: any[] = [];
  categotylist: Array<any>;
  optionCount: any[] = [0];

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.pollType = [
      { value: 'Single', label: 'Single' },
      { value: 'Multiple', label: 'Multiple' },
    ];
    this.categoryService.getCategory()
    .subscribe(data => {
      this.categotylist = [];
      for (const prop of data.data) {
        this.categotylist.push({ value: prop._id, label: prop.name });
      }
    });
  }
}
