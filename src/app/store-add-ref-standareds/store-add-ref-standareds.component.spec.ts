import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAddRefStandaredsComponent } from './store-add-ref-standareds.component';

describe('StoreAddRefStandaredsComponent', () => {
  let component: StoreAddRefStandaredsComponent;
  let fixture: ComponentFixture<StoreAddRefStandaredsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAddRefStandaredsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreAddRefStandaredsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
