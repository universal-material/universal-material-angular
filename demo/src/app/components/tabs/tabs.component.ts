import { Component, OnInit } from '@angular/core';

import htmlCode from './tabs-example/tabs-example.component.html';
import cssCode from '!raw-loader!./tabs-example/tabs-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./tabs-example/tabs-example.component.ts';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;

  constructor() { }

  ngOnInit() {
  }

}
