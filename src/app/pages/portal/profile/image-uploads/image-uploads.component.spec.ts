import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadsComponent } from './image-uploads.component';

describe('ImageUploadsComponent', () => {
  let component: ImageUploadsComponent;
  let fixture: ComponentFixture<ImageUploadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageUploadsComponent]
    });
    fixture = TestBed.createComponent(ImageUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
