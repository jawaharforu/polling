import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpIntelligenceManageComponent } from './np-intelligence-manage.component';

describe('NpIntelligenceManageComponent', () => {
  let component: NpIntelligenceManageComponent;
  let fixture: ComponentFixture<NpIntelligenceManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpIntelligenceManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpIntelligenceManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
