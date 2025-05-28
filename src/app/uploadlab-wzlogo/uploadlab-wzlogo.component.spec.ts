import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadlabWzlogoComponent } from './uploadlab-wzlogo.component';

describe('UploadlabWzlogoComponent', () => {
  let component: UploadlabWzlogoComponent;
  let fixture: ComponentFixture<UploadlabWzlogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadlabWzlogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadlabWzlogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
