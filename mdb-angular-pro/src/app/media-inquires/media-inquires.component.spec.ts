import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInquiresComponent } from './media-inquires.component';

describe('MediaInquiresComponent', () => {
  let component: MediaInquiresComponent;
  let fixture: ComponentFixture<MediaInquiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInquiresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInquiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
