import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./select-example/select-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./select-example/select-example.component.scss';
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
