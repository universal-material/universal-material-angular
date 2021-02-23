import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./progress-spinner-example/progress-spinner-example.component.html';
// @ts-ignore
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
