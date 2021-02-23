import { Component } from '@angular/core';

// @ts-ignore
import htmlCode from '!raw-loader!./slider-example/slider-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./slider-example/slider-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./slider-example/slider-example.component.ts';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
