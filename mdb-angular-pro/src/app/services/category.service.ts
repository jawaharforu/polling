import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  link: String = 'http://localhost:3000/';
  constructor(
    private http: Http
  ) { }

  getCategory() {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.get(this.link + 'api/categories/categories', {headers: headers})
    .map(res => res.json());
  }
  addCategory(newCategory) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(this.link + 'api/categories/category', newCategory, {headers: headers})
    .map(res => res.json());
  }
  updateProduct(categoryid, updateCategory) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(this.link + 'api/categories/category/' + categoryid, updateCategory, {headers: headers})
    .map(res => res.json());
  }
  deleteProduct(categoryid) {
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.delete(this.link + 'api/categories/category/' + categoryid, {headers: headers})
    .map(res => res.json());
  }
}
