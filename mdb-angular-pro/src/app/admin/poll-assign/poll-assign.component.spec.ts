import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollAssignComponent } from './poll-assign.component';

describe('PollAssignComponent', () => {
  let component: PollAssignComponent;
  let fixture: ComponentFixture<PollAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
