import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddCustomerNameAddrsComponent } from './store-add-customer-name-addrs.component';

describe('StoreAddCustomerNameAddrsComponent', () => {
  let component: StoreAddCustomerNameAddrsComponent;
  let fixture: ComponentFixture<StoreAddCustomerNameAddrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAddCustomerNameAddrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreAddCustomerNameAddrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
