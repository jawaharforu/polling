import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpIntelligenceComponent } from './np-intelligence.component';

describe('NpIntelligenceComponent', () => {
  let component: NpIntelligenceComponent;
  let fixture: ComponentFixture<NpIntelligenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpIntelligenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpIntelligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
