import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordFormComponent } from './update-password-form.component';

describe('UpdatePasswordFormComponent', () => {
  let component: UpdatePasswordFormComponent;
  let fixture: ComponentFixture<UpdatePasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePasswordFormComponent]
    });
    fixture = TestBed.createComponent(UpdatePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
