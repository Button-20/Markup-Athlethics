import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionNotificationsComponent } from './notifications.component';

describe('TransactionNotificationsComponent', () => {
  let component: TransactionNotificationsComponent;
  let fixture: ComponentFixture<TransactionNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
