import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreViewReportsComponent } from './store-view-reports.component';

describe('StoreViewReportsComponent', () => {
  let component: StoreViewReportsComponent;
  let fixture: ComponentFixture<StoreViewReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreViewReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreViewReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
