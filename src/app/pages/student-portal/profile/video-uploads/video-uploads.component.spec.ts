import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUploadsComponent } from './video-uploads.component';

describe('VideoUploadsComponent', () => {
  let component: VideoUploadsComponent;
  let fixture: ComponentFixture<VideoUploadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoUploadsComponent]
    });
    fixture = TestBed.createComponent(VideoUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
