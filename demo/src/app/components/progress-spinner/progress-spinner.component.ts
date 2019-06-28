import { Component } from '@angular/core';

import htmlCode from './progress-spinner-example/progress-spinner-example.component.html';
import cssCode from '!raw-loader!./progress-spinner-example/progress-spinner-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./progress-spinner-example/progress-spinner-example.component.ts';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
