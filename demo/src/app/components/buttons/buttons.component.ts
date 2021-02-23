import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./buttons-example/buttons-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./buttons-example/buttons-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./buttons-example/buttons-example.component.ts';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
