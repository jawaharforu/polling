import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  categoty: String;
  categotylist: any;
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
      name: this.categoty
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
          this.categotylist.push(data.data);
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
    });
  }
}
