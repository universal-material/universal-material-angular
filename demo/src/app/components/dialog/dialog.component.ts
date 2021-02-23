import { Component } from '@angular/core';

import htmlCode from './dialog-example/dialog-example.component.html';
import cssCode from '!raw-loader!./dialog-example/dialog-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./dialog-example/dialog-example.component.ts';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
