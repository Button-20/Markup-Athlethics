import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent {
  @Input() message: string = 'No data found';
}
