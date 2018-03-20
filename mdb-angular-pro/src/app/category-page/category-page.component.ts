import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import {ActivatedRoute} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  categorySlug: any; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    meta: Meta,
    title: Title
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const slug = params['slug']
      this.categoryService.getCategorySlug(slug)
      .subscribe(data => {
        this.categorySlug = data.data;
        title.setTitle(this.categorySlug.title);
        meta.addTags([
          { name: 'author',   content: 'Coursetro.com' },
          { name: 'keywords', content: this.categorySlug.description },
          { name: 'description', content: this.categorySlug.description }
        ]);
      });
    });
  }

  ngOnInit() {
  }

}
