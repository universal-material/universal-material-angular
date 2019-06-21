import { Component } from '@angular/core';

import htmlCode from './typeahead-example/typeahead-example.component.html';
import cssCode from '!raw-loader!./typeahead-example/typeahead-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./typeahead-example/typeahead-example.component.ts';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
