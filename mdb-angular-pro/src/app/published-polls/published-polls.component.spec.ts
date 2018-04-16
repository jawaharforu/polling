import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedPollsComponent } from './published-polls.component';

describe('PublishedPollsComponent', () => {
  let component: PublishedPollsComponent;
  let fixture: ComponentFixture<PublishedPollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedPollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
