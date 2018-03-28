import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-nav',
  templateUrl: './category-nav.component.html',
  styleUrls: ['./category-nav.component.scss']
})
export class CategoryNavComponent implements OnInit {

  categotylist: any;
  @Input()  type: String;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCategoryStatus()
    .subscribe(data => {
      this.categotylist = data.data;
    });
  }

  categoryPage(c) {
    this.router.navigate([this.type + '/' + c.slug]);
  }

}
