import { Component } from '@angular/core';

import { ExampleComponent } from '../../example/example.component';
import { DialogExampleComponent } from './dialog-example/dialog-example.component';

// @ts-ignore
import htmlCode from './dialog-example/dialog-example.component.html';
// @ts-ignore
import cssCode from './dialog-example/dialog-example.component.scss';
// @ts-ignore
import tsCode from './dialog-example/dialog-example.component.ts' with { loader: 'text' };

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  standalone: true,
  imports: [
    ExampleComponent,
    DialogExampleComponent
  ]
})
export class DialogComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
