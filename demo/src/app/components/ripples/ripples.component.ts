import { Component } from '@angular/core';

import htmlCode from './ripples-example/ripples-example.component.html';
import cssCode from '!raw-loader!./ripples-example/ripples-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./ripples-example/ripples-example.component.ts';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripples.component.html',
  styleUrls: ['./ripples.component.scss']
})
export class RipplesComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
