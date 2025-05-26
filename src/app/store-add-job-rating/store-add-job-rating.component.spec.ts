import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddJobRatingComponent } from './store-add-job-rating.component';

describe('StoreAddJobRatingComponent', () => {
  let component: StoreAddJobRatingComponent;
  let fixture: ComponentFixture<StoreAddJobRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAddJobRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreAddJobRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
