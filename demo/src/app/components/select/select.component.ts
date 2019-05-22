import { Component } from '@angular/core';

import htmlCode from './select-example/select-example.component.html';
import cssCode from './select-example/select-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./select-example/select-example.component.ts';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
