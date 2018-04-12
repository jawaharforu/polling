import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousPollsComponent } from './previous-polls.component';

describe('PreviousPollsComponent', () => {
  let component: PreviousPollsComponent;
  let fixture: ComponentFixture<PreviousPollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousPollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
