import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditUserProfileComponent } from './store-edit-user-profile.component';

describe('StoreEditUserProfileComponent', () => {
  let component: StoreEditUserProfileComponent;
  let fixture: ComponentFixture<StoreEditUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreEditUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreEditUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
