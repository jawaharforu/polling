import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LinkService } from './link.service';

@Injectable()
export class CategoryService {

  // link: String = 'http://localhost:3000/';
  link: String;
  authToken: any;
  user: any;

  constructor(
    private http: Http,
    private linkService: LinkService
  ) {
    this.link = this.linkService.link;
  }

  getCategory() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/categories/categories', {headers: headers})
    .map(res => res.json());
  }
  getCategoryStatus() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/categories/categoriesstatus', {headers: headers})
    .map(res => res.json());
  }
  getCategorySlug(slug) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/categories/categoriesslug/' + slug, {headers: headers})
    .map(res => res.json());
  }
  addCategory(newCategory) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/categories/category', newCategory, {headers: headers})
    .map(res => res.json());
  }
  updateCategory(categoryid, updateCategory) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/categories/category/' + categoryid, updateCategory, {headers: headers})
    .map(res => res.json());
  }
  deleteCategory(categoryid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.link + 'api/categories/category/' + categoryid, {headers: headers})
    .map(res => res.json());
  }
}
