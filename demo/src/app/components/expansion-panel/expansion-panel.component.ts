import { Component } from '@angular/core';

import htmlCode from './expansion-panel-example/expansion-panel-example.component.html';
import cssCode from '!raw-loader!./expansion-panel-example/expansion-panel-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./expansion-panel-example/expansion-panel-example.component.ts';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
