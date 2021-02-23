import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./tabs-example/tabs-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./tabs-example/tabs-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./tabs-example/tabs-example.component.ts';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
