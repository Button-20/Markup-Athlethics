import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleticBackgroundComponent } from './athletic-background.component';

describe('AthleticBackgroundComponent', () => {
  let component: AthleticBackgroundComponent;
  let fixture: ComponentFixture<AthleticBackgroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AthleticBackgroundComponent]
    });
    fixture = TestBed.createComponent(AthleticBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
