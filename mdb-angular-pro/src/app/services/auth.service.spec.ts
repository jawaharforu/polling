import { TestBed, inject } from '@angular/core/testing';

import { AuthServices } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthServices]
    });
  });

  it('should be created', inject([AuthServices], (service: AuthServices) => {
    expect(service).toBeTruthy();
  }));
});
