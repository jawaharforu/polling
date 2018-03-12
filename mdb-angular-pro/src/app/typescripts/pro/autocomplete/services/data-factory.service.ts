import {Http} from '@angular/http';

import {LocalData} from './local-data.service';
import {RemoteData} from './remote-data.service';


export function localDataFactory () {
  return () => {
    return new LocalData();
  };
}

export function remoteDataFactory (http: Http) {
  return () => {
    return new RemoteData(http);
  };
}

export let LocalDataFactoryProvider = {provide: LocalData, useFactory: localDataFactory};
export let RemoteDataFactoryProvider = {provide: RemoteData, useFactory: remoteDataFactory, deps: [Http]};
