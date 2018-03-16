import { TestBed, inject } from '@angular/core/testing';

import { VoteduserService } from './voteduser.service';

describe('VoteduserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoteduserService]
    });
  });

  it('should be created', inject([VoteduserService], (service: VoteduserService) => {
    expect(service).toBeTruthy();
  }));
});
