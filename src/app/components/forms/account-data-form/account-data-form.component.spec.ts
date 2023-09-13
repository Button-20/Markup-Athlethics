import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDataFormComponent } from './account-data-form.component';

describe('AccountDataFormComponent', () => {
  let component: AccountDataFormComponent;
  let fixture: ComponentFixture<AccountDataFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDataFormComponent]
    });
    fixture = TestBed.createComponent(AccountDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
