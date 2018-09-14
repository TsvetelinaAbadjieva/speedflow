
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsTableComponent } from './payments-table.component';

describe('PaymentsTableComponent', () => {
  let component: PaymentsTableComponent;
  let fixture: ComponentFixture<PaymentsTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
