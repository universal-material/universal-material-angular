import { Component } from '@angular/core';

import htmlCode from './selection-controls-example/selection-controls-example.component.html';
import cssCode from '!raw-loader!./selection-controls-example/selection-controls-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./selection-controls-example/selection-controls-example.component.ts';

@Component({
  selector: 'app-selection-controls',
  templateUrl: './selection-controls.component.html',
  styleUrls: ['./selection-controls.component.scss']
})
export class SelectionControlsComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
