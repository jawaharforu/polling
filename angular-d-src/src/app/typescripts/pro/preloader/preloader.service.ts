import {
  Injectable,
  Inject
} from '@angular/core';

import {
  DOCUMENT
} from '@angular/platform-browser';

import {
  CONTAINER_QUERY,
  COMPLETE_CLASS_NAME,
  TYPE_ERROR_CONTAINER_WAS_NOT_FOUND_MESSAGE,
  EMULATE_ELEMENT_NAME
} from './preloader.constants';

import {MDB_SPINNING_PRELOADER_TYPE} from './preloader.types';

@Injectable()
export class MDBSpinningPreloader {
  public _container: MDB_SPINNING_PRELOADER_TYPE;

  public static errorHandler() {
    throw new TypeError(TYPE_ERROR_CONTAINER_WAS_NOT_FOUND_MESSAGE);
  }

  constructor(@Inject(DOCUMENT) public document: any) {
    this.container = this.document.querySelector(CONTAINER_QUERY);
  }

  public start() {
    this.container.classList.remove(COMPLETE_CLASS_NAME);
  }

  public stop() {
    this.container.classList.add(COMPLETE_CLASS_NAME);
  }

  public get container(): MDB_SPINNING_PRELOADER_TYPE {
    return this._container;
  }

  public set container(element) {
    if (!element) {
      // NgSpinningPreloader.errorHandler();
    }

    this._container = element || this.document.createElement(EMULATE_ELEMENT_NAME);
  }

}
