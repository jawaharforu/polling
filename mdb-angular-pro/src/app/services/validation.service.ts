import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
  error: any[] = [];
  constructor() { }

  validateRegister(user) {
    if (user.name === '' || user.email === '' || user.mobile === '' || user.password === '') {
        return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateMobile(mobile) {
    const mob = /[0-9]+/;
    if (!mob.test(mobile)) {
      return 'Mobile field shoud have only number';
    } else if (mobile.length !== 10) {
      return 'Mobile field shoud contain only 10 numbers';
    } else {
      return true;
    }
  }

}
