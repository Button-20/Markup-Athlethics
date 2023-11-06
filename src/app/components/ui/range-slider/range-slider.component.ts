import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss'],
})
export class RangeSliderComponent {
  @ViewChild('slider1') slider1: any;

  @ViewChild('slider2') slider2: any;

  @ViewChild('range1') range1: any;

  @ViewChild('range2') range2: any;

  @ViewChild('track') track: any;

  @Input() label: string = '';

  @Input() value: Array<number> = [];

  @Output() userChange: EventEmitter<{ min: number; max: number }> =
    new EventEmitter<{ min: number; max: number }>();

  percent1: number = 0;

  percent2: number = 0;

  minGap: number = 0;

  constructor() {}

  ngOnChanges() {
    setTimeout(() => {
      this.slideOne();
      this.slideTwo();
    }, 100);
  }

  slideOne() {
    let firstSlider = this.slider1?.nativeElement?.value || 0;
    let secondSlider = this.slider2?.nativeElement?.value || 0;
    if (parseInt(secondSlider) - parseInt(firstSlider) <= this.minGap) {
      firstSlider = parseInt(secondSlider) - this.minGap;
    }
    this.value[0] = firstSlider;
    this.userChange.emit({
      min: Number(firstSlider),
      max: Number(secondSlider),
    });
    this.fillColor();
  }

  slideTwo() {
    let firstSlider = this.slider1?.nativeElement?.value || 0;
    let secondSlider = this.slider2?.nativeElement?.value || 0;
    if (parseInt(secondSlider) - parseInt(firstSlider) <= this.minGap) {
      secondSlider = parseInt(firstSlider) + this.minGap;
    }
    this.value[1] = secondSlider;
    this.userChange.emit({
      min: Number(firstSlider),
      max: Number(secondSlider),
    });
    this.fillColor();
  }

  fillColor() {
    let sliderTrack = document.querySelectorAll(
      '.slider-track'
    ) as NodeListOf<HTMLElement>;
    let firstSlider = this.slider1?.nativeElement?.value || 0;
    let secondSlider = this.slider2?.nativeElement?.value || 0;

    this.percent1 = (firstSlider / this.slider1?.nativeElement?.max) * 100;
    this.percent2 = (secondSlider / this.slider2?.nativeElement?.max) * 100;
    this.track.nativeElement.style.background = `linear-gradient(to right, #dadae5 ${this.percent1}% , #96fc58 ${this.percent1}% , #96fc58 ${this.percent2}%, #dadae5 ${this.percent2}%)`;
  }

  changeRange(event: any, type: string) {
    let value = event.target.value;
    if (type == 'min') {
      this.slider1.nativeElement.value = value;
      this.slideOne();
    } else {
      this.slider2.nativeElement.value = value;
      this.slideTwo();
    }
  }
}
