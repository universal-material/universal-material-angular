import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./selection-controls-example/selection-controls-example.component.html';
// @ts-ignore
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
