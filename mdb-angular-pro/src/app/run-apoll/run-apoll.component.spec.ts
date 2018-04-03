import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunApollComponent } from './run-apoll.component';

describe('RunApollComponent', () => {
  let component: RunApollComponent;
  let fixture: ComponentFixture<RunApollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunApollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunApollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
