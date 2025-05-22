import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGenerateReportsComponent } from './store-generate-reports.component';

describe('StoreGenerateReportsComponent', () => {
  let component: StoreGenerateReportsComponent;
  let fixture: ComponentFixture<StoreGenerateReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreGenerateReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreGenerateReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
