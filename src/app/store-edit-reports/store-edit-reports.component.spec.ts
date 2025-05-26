import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditReportsComponent } from './store-edit-reports.component';

describe('StoreEditReportsComponent', () => {
  let component: StoreEditReportsComponent;
  let fixture: ComponentFixture<StoreEditReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreEditReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreEditReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
