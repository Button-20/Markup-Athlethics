import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialsHangingComponent } from './socials-hanging.component';

describe('SocialsHangingComponent', () => {
  let component: SocialsHangingComponent;
  let fixture: ComponentFixture<SocialsHangingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialsHangingComponent]
    });
    fixture = TestBed.createComponent(SocialsHangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
