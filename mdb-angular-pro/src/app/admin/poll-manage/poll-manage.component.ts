import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from '../../services/category.service';
import { PollService } from '../../services/poll.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ModalDirective } from '../../typescripts/free';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { IMyOptions } from '../../typescripts/pro/date-picker/index';

@Component({
  selector: 'app-poll-manage',
  templateUrl: './poll-manage.component.html',
  styleUrls: ['./poll-manage.component.scss']
})
export class PollManageComponent implements OnInit {

  pollList: any;
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown: Boolean = false;
  pollType: Array<any>;
  pollCategoryid: String;
  categotylist: Array<any>;
  pollCreateForm: FormGroup;
  updatePolls: any;
  imageUrl: String;
  public myDatePickerOptions: IMyOptions = {
    
  };
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private categoryService: CategoryService,
    private pollService: PollService,
    private _fb: FormBuilder,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    this.pollType = [
      { value: 'Single', label: 'Single' },
      { value: 'Multiple', label: 'Multiple' },
    ];
    this.pollService.getPoll()
    .subscribe(data => {
      this.pollList = data.data;
      this.spinnerService.hide();
    });
    this.pollCreateForm = this._fb.group({
      pollname: this._fb.control(null),
      selectedPollType: this._fb.control(null),
      pollStatus: this._fb.control(false),
      trending: this._fb.control(false),
      result: this._fb.control(false),
      displayhome: this._fb.control(false),
      pollCategoryid: this._fb.control(null),
      pollOption: this._fb.array([]),
      todate: this._fb.control(null),
      updatepollid: this._fb.control(null)
    });
    this.categoryService.getCategory()
    .subscribe(data => {
      this.categotylist = [];
      for (const prop of data.data) {
        this.categotylist.push({ value: prop._id, label: prop.name });
      }
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

  deletePoll(pollid) {
    this.pollService.deletePoll(pollid)
    .subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.pollList = data.data;
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  updateFunction(pollid, updateCategory) {
    this.pollService.updatePoll(pollid, updateCategory)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.pollList = data.data;
          this.pollCreateForm.reset();
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
    });
  }

  updatePoll() {
    const pollid = this.pollCreateForm.value.updatepollid;
    const updatePoll = {
      name: this.pollCreateForm.value.pollname,
      type: 'Single', // this.pollCreateForm.value.selectedPollType,
      status: this.pollCreateForm.value.pollStatus,
      trending: this.pollCreateForm.value.trending,
      result: this.pollCreateForm.value.result,
      home: this.pollCreateForm.value.displayhome,
      categoryid: this.pollCreateForm.value.pollCategoryid,
      options: this.pollCreateForm.value.pollOption,
      image: this.imageUrl,
      todate: this.pollCreateForm.value.todate
    };
    if (updatePoll.name.length === 0 || updatePoll.options[0].itemname === ''
    || updatePoll.type.length === 0 || updatePoll.categoryid.length === 0) {
      this._flashMessagesService.show('Please Fill All Mandatory Fields!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.updateFunction(pollid, updatePoll);
    this.hideModal();
  }

  updateStatus(event, p, updateto) {
    switch (updateto) {
      case 'status':
        this.updatePolls = {
          name: p.name,
          type: p.type,
          status: event,
          trending: p.trending,
          home: p.home,
          categoryid: p.categoryid,
          options: p.options,
          image: p.image,
          result: p.result,
          todate: p.todate
        };
        break;
      case 'trending':
        this.updatePolls = {
          name: p.name,
          type: p.type,
          status: p.status,
          trending: event,
          home: p.home,
          categoryid: p.categoryid,
          options: p.options,
          image: p.image,
          result: p.result,
          todate: p.todate
        };
        break;
      case 'home':
        this.updatePolls = {
          name: p.name,
          type: p.type,
          status: p.status,
          trending: p.trending,
          home: event,
          categoryid: p.categoryid,
          options: p.options,
          image: p.image,
          result: p.result,
          todate: p.todate
        };
        break;
      case 'result':
        this.updatePolls = {
          name: p.name,
          type: p.type,
          status: p.status,
          trending: p.trending,
          home: p.home,
          categoryid: p.categoryid,
          options: p.options,
          image: p.image,
          result: event,
          todate: p.todate
        };
        break;
      default:
        this.updatePolls = {
          name: p.name,
          type: p.type,
          status: p.status,
          trending: p.trending,
          home: p.home,
          categoryid: p.categoryid,
          options: p.options,
          image: p.image,
          result: p.result,
          todate: p.todate
        };
    }

    this.updateFunction(p._id, this.updatePolls);
  }

  public showModal(p): void {
    this.pollCreateForm = this._fb.group({
      pollname: this._fb.control(null),
      selectedPollType: this._fb.control(null),
      pollStatus: this._fb.control(false),
      trending: this._fb.control(false),
      result: this._fb.control(false),
      displayhome: this._fb.control(false),
      pollCategoryid: this._fb.control(null),
      pollOption: this._fb.array([]),
      updatepollid: this._fb.control(null),
      todate: this._fb.control(null)
    });
    for (let i = 1; i <= p.options.length; i++) {
      this.addNewRow();
      if (i === p.options.length) {
        this.imageUrl = p.image;
        this.pollCreateForm.setValue({
          pollname: p.name,
          selectedPollType: p.type,
          pollStatus: p.status,
          trending: p.trending,
          result: p.result,
          displayhome: p.home,
          pollCategoryid: p.categoryid,
          pollOption: p.options,
          updatepollid: p._id,
          todate: (p.todate === null) ? new Date() : p.todate
        });
      }
    }
    this.isModalShown = true;
  }

  public hideModal(): void {
      this.autoShownModal.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        const url = event.target.result;
        this.imageUrl = url;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  fileEvent(e) {
    this.readUrl(e);
  }
  pollResult(pid) {
    this.router.navigate(['/admin', {outlets: {'adminchild': ['pollresult' , pid]}}]);
  }

}
