import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterslistComponent } from './voterslist.component';

describe('VoterslistComponent', () => {
  let component: VoterslistComponent;
  let fixture: ComponentFixture<VoterslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
