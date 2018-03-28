import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsManageComponent } from './contact-us-manage.component';

describe('ContactUsManageComponent', () => {
  let component: ContactUsManageComponent;
  let fixture: ComponentFixture<ContactUsManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactUsManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
