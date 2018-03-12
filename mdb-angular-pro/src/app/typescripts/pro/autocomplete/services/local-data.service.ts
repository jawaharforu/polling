import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CompleterBaseData } from './base-data.service';
import { CompleterItem } from '../components/completer-item.component';

@Injectable()
export class LocalData extends CompleterBaseData {

  private _data: any[];
  // private savedTerm: string;
  private savedTerm: string | any;

  constructor() {
    super();
  }

  public data(data: any[] | Observable<any[]>) {
    if (data instanceof Observable) {
      (<Observable<any[]>>data).subscribe((res) => {
        this._data = res;
        if (this.savedTerm) {
          this.search(this.savedTerm);
        }
      });
    } else {
      this._data = <any[]>data;
    }

    return this;
  }

  public search(term: string): void {
    if (!this._data) {
      this.savedTerm = term;
    } else {
      this.savedTerm = null;
      const matches: any[] = this.extractMatches(this._data, term);
      this.next(this.processResults(matches));
    }
  }

  // public convertToItem(data: any): CompleterItem {
    public convertToItem(data: any): CompleterItem | any {
    return super.convertToItem(data);
  }
}
