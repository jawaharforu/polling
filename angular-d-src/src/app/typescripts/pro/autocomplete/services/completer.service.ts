import {Injectable, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {LocalData} from './local-data.service';
import {RemoteData} from './remote-data.service';


@Injectable()
export class CompleterService {
  constructor(
    @Inject(LocalData) private localDataFactory: any, // Using any instead of () => LocalData because on AoT errors
    @Inject(RemoteData) private remoteDataFactory: any // Using any instead of () => LocalData because on AoT errors
  ) { }

  public local(data: any[] | Observable<any>, searchFields = '', titleField = ''): LocalData {

    const localData = this.localDataFactory();
    return localData
      .data(data)
      .searchFields(searchFields)
      .titleField(titleField);
  }

  public remote(url: string, searchFields = '', titleField = ''): RemoteData {

    const remoteData = this.remoteDataFactory();
    return remoteData
      .remoteUrl(url)
      .searchFields(searchFields)
      .titleField(titleField);
  }
}
