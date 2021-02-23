import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./progress-dialog-example/progress-dialog-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./progress-dialog-example/progress-dialog-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./progress-dialog-example/progress-dialog-example.component.ts';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.scss']
})
export class ProgressDialogComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
