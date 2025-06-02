import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreChangepasswordComponent } from './store-changepassword.component';

describe('StoreChangepasswordComponent', () => {
  let component: StoreChangepasswordComponent;
  let fixture: ComponentFixture<StoreChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreChangepasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
