import {Observable} from 'rxjs/Observable';

import { CompleterItem } from '../components/completer-item.component';

export interface CompleterData extends Observable<CompleterItem[]> {
  search(term: string): void;
  cancel(): void;
  // convertToItem?(data: any): CompleterItem;
  convertToItem?(data: any): CompleterItem | any;
}
