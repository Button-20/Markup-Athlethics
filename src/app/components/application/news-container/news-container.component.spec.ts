import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsContainerComponent } from './news-container.component';

describe('NewsContainerComponent', () => {
  let component: NewsContainerComponent;
  let fixture: ComponentFixture<NewsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsContainerComponent]
    });
    fixture = TestBed.createComponent(NewsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
