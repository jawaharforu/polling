import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from '../../services/category.service';
import { PollService } from '../../services/poll.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { IMyOptions } from '../../typescripts/pro/date-picker/index';

@Component({
  selector: 'app-poll-create',
  templateUrl: './poll-create.component.html',
  styleUrls: ['./poll-create.component.scss']
})
export class PollCreateComponent implements OnInit {

  pollType: Array<any>;
  pollCategoryid: String;
  categotylist: Array<any>;
  pollCreateForm: FormGroup;
  imageUrl: String;
  imageurlstatus = false;

  public myDatePickerOptions: IMyOptions = {

  };

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private categoryService: CategoryService,
    private pollService: PollService,
    private _fb: FormBuilder,
    private router: Router
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
    this.pollCreateForm = this._fb.group({
      pollname: this._fb.control(null),
      selectedPollType: this._fb.control(null),
      pollStatus: this._fb.control(false),
      trending: this._fb.control(false),
      displayhome: this._fb.control(false),
      pollFromDate: this._fb.control(null),
      pollToDate: this._fb.control(null),
      pollCategoryid: this._fb.control(null),
      pollImage: this._fb.control(null),
      pollOption: this._fb.array([this.initItemRows()])
    });
  }

  initItemRows() {
      return this._fb.group({
          itemname: ['']
      });
  }

  addNewRow() {
      const control = <FormArray>this.pollCreateForm.controls['pollOption'];
      control.push(this.initItemRows());
  }

  deleteRow(index: number) {
      const control = <FormArray>this.pollCreateForm.controls['pollOption'];
      control.removeAt(index);
  }

  addPoll() {
    if (this.imageUrl !== '') {
      this.imageUrl = this.imageUrl;
    } else {
      this.imageUrl = this.imageUrl;
    }
    const newPoll = {
      name: this.pollCreateForm.value.pollname,
      type: this.pollCreateForm.value.selectedPollType,
      status: this.pollCreateForm.value.pollStatus,
      trending: this.pollCreateForm.value.trending,
      home: this.pollCreateForm.value.displayhome,
      categoryid: this.pollCreateForm.value.pollCategoryid,
      options: this.pollCreateForm.value.pollOption,
      fromdate: this.pollCreateForm.value.pollFromDate,
      todate: this.pollCreateForm.value.pollToDate,
      image: this.imageUrl
    };
    if (newPoll.name.length === 0 || newPoll.options[0].itemname === '' || newPoll.type.length === 0 || newPoll.categoryid.length === 0) {
      this._flashMessagesService.show('Please Fill All Mandatory Fields!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.pollService.addPoll(newPoll)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/admin', {outlets: {'adminchild': ['pollmanage']}}]);
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
    });
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        const url = event.target.result;
        this.imageUrl = url;
        this.imageurlstatus = true;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  fileEvent(e) {
    this.readUrl(e);
  }
}
