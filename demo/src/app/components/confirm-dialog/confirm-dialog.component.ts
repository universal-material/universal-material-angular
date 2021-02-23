import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./confirm-dialog-example/confirm-dialog-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./confirm-dialog-example/confirm-dialog-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./confirm-dialog-example/confirm-dialog-example.component.ts';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
