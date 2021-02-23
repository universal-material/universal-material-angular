import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./simple-snackbar-example/simple-snackbar-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./simple-snackbar-example/simple-snackbar-example.component.scss';
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
