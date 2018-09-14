
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataDashboardComponent } from './user-data-dashboard.component';

describe('UserDataDashboardComponent', () => {
  let component: UserDataDashboardComponent;
  let fixture: ComponentFixture<UserDataDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
