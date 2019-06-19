import { Component } from '@angular/core';

import htmlCode from './chip-input-example/chip-input-example.component.html';
import cssCode from '!raw-loader!./chip-input-example/chip-input-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./chip-input-example/chip-input-example.component.ts';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss']
})
export class ChipInputComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
