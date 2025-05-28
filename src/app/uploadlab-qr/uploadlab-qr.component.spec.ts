import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadlabQrComponent } from './uploadlab-qr.component';

describe('UploadlabQrComponent', () => {
  let component: UploadlabQrComponent;
  let fixture: ComponentFixture<UploadlabQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadlabQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadlabQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
