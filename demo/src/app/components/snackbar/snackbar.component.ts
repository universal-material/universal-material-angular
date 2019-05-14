import { Component } from '@angular/core';

import htmlCode from './simple-snackbar-example/simple-snackbar-example.component.html';
import cssCode from './simple-snackbar-example/simple-snackbar-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./simple-snackbar-example/simple-snackbar-example.component.ts';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
