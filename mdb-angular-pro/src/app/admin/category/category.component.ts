import { Component, OnInit, ViewChild  } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from '../../services/category.service';
import { ModalDirective } from '../../typescripts/free';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoty: String;
  categotylist: any;
  updatecategoty: String;
  updatecategotyid: String;
  categorystatus: Boolean;
  updatecategotycontent: String;
  categotycontent: String;
  title: String;
  description: String;
  keywords: String;
  updatetitle: String;
  updatedescription: String;
  updatekeywords: String;

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown: Boolean = false;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getCategory()
    .subscribe(data => {
      this.categotylist = data.data;
    });
  }

  addCategory() {
    const newCategory = {
      name: this.categoty,
      content: this.categotycontent
    };
    if (newCategory.name === undefined || newCategory.name === '') {
      this._flashMessagesService.show('Category field should not be empty!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.categoryService.addCategory(newCategory)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.categoty = '';
          this.categotycontent = '';
          this.title = '';
          this.description = '';
          this.keywords = '';
          this.categotylist.push(data.data);
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
    });
  }

  deleteCategory(categoryid) {
    this.categoryService.deleteCategory(categoryid)
    .subscribe(data => {
      if (data.success) {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.categotylist = data.data;
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  updateFunction(categoryid, updateCategory) {
    this.categoryService.updateCategory(categoryid, updateCategory)
      .subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.updatecategoty = '';
          this.updatecategotyid = '';
          this.updatetitle = '';
          this.updatedescription = '';
          this.updatekeywords = '';
          this.categotylist = data.data;
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
    });
  }

  updateCategory(categoryid) {
    const updateCategory = {
      name: this.updatecategoty,
      content: this.updatecategotycontent,
      status: this.categorystatus,
      title: this.title,
      description: this.description,
      keywords: this.keywords
    };
    if (updateCategory.name === undefined || updateCategory.name === '') {
      this._flashMessagesService.show('Category field should not be empty!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.updateFunction(categoryid, updateCategory);
    this.hideModal();
  }

  updateStatus(event, x) {
    const updateCategory = {
      name: x.name,
      content: x.content,
      status: event,
      title: x.title,
      description: x.description,
      keywords: x.keywords
    };
    this.updateFunction(x._id, updateCategory);
  }

  public showModal(c): void {
    this.updatecategoty = c.name;
    this.updatecategotyid = c._id;
    this.updatecategotycontent = c.content;
    this.categorystatus = c.status;
    this.isModalShown = true;
  }

  public hideModal(): void {
      this.autoShownModal.hide();
  }

  public onHidden(): void {
      this.isModalShown = false;
  }
}
