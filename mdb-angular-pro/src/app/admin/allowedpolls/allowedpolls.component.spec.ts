import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowedpollsComponent } from './allowedpolls.component';

describe('AllowedpollsComponent', () => {
  let component: AllowedpollsComponent;
  let fixture: ComponentFixture<AllowedpollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllowedpollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowedpollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
