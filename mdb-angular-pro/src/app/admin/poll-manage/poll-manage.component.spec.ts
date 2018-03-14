import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollManageComponent } from './poll-manage.component';

describe('PollManageComponent', () => {
  let component: PollManageComponent;
  let fixture: ComponentFixture<PollManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
