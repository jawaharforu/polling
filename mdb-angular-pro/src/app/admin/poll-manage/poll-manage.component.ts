import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from '../../services/category.service';
import { PollService } from '../../services/poll.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { ModalDirective } from '../../typescripts/free';

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

  constructor(
    private _flashMessagesService: FlashMessagesService,
    private categoryService: CategoryService,
    private pollService: PollService,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    this.pollType = [
      { value: 'Single', label: 'Single' },
      { value: 'Multiple', label: 'Multiple' },
    ];
    this.pollService.getPoll()
    .subscribe(data => {
      this.pollList = data.data;
    });
    this.pollCreateForm = this._fb.group({
      pollname: this._fb.control(null),
      selectedPollType: this._fb.control(null),
      pollStatus: this._fb.control(false),
      pollCategoryid: this._fb.control(null),
      pollOption: this._fb.array([]),
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
      type: this.pollCreateForm.value.selectedPollType,
      status: this.pollCreateForm.value.pollStatus,
      categoryid: this.pollCreateForm.value.pollCategoryid,
      options: this.pollCreateForm.value.pollOption
    };
    if (updatePoll.name.length === 0 || updatePoll.options[0].itemname === ''
    || updatePoll.type.length === 0 || updatePoll.categoryid.length === 0) {
      this._flashMessagesService.show('Please Fill All Mandatory Fields!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.updateFunction(pollid, updatePoll);
    this.hideModal();
  }

  updateStatus(event,p) {
    const updatePoll = {
      name: p.name,
      type: p.type,
      status: event,
      categoryid: p.categoryid,
      options: p.options
    };
    this.updateFunction(p._id, updatePoll);
  }

  public showModal(p): void {
    for (let i = 1; i <= p.options.length; i++) {
      this.addNewRow();
      if (i === p.options.length) {
        this.pollCreateForm.setValue({
          pollname: p.name,
          selectedPollType: p.type,
          pollStatus: p.status,
          pollCategoryid: p.categoryid,
          pollOption: p.options,
          updatepollid: p._id
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

}
