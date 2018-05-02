import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepollComponent } from './singlepoll.component';

describe('SinglepollComponent', () => {
  let component: SinglepollComponent;
  let fixture: ComponentFixture<SinglepollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglepollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
