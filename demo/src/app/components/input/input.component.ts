import { Component } from '@angular/core';

import htmlCode from './text-field-example/text-field-example.component.html';
import cssCode from '!raw-loader!./text-field-example/text-field-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./text-field-example/text-field-example.component.ts';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
