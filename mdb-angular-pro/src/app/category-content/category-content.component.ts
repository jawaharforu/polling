import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.scss']
})
export class CategoryContentComponent implements OnInit {

  categotylist: any;
  
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
    this.router.navigate(['category/' + c.slug]);
  }

}
