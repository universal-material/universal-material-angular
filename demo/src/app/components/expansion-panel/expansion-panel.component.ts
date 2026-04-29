import { Component } from '@angular/core';

import { ExampleComponent } from '../../example/example.component';
import { ExpansionPanelExampleComponent } from './expansion-panel-example/expansion-panel-example.component';

// @ts-ignore
import htmlCode from './expansion-panel-example/expansion-panel-example.component.html';
// @ts-ignore
import cssCode from './expansion-panel-example/expansion-panel-example.component.scss';
// @ts-ignore
import tsCode from './expansion-panel-example/expansion-panel-example.component.ts' with { loader: 'text' };

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  standalone: true,
  imports: [
    ExampleComponent,
    ExpansionPanelExampleComponent
  ]
})
export class ExpansionPanelComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
