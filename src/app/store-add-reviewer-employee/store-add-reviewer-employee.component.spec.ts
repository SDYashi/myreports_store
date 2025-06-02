import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddReviewerEmployeeComponent } from './store-add-reviewer-employee.component';

describe('StoreAddReviewerEmployeeComponent', () => {
  let component: StoreAddReviewerEmployeeComponent;
  let fixture: ComponentFixture<StoreAddReviewerEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAddReviewerEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreAddReviewerEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
