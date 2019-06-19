import { Component } from '@angular/core';

import htmlCode from './datepicker-example/datepicker-example.component.html';
import cssCode from '!raw-loader!./datepicker-example/datepicker-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./datepicker-example/datepicker-example.component.ts';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
