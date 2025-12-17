import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ExampleComponent } from '../../example/example.component';
import { DatepickerExampleComponent } from './datepicker-example/datepicker-example.component';

// @ts-ignore
import htmlCode from '!raw-loader!./datepicker-example/datepicker-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./datepicker-example/datepicker-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./datepicker-example/datepicker-example.component.ts';
import { MaskWrapperDirective } from '../../mask-wrapper.directive';
import {
  UmDefaultControlValueAccessor
} from '@universal-material/angular/value-accessors/default-control-value-accessor';
import { UniversalMaterialModule } from '@universal-material/angular/index';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ExampleComponent,
    DatepickerExampleComponent,
    UniversalMaterialModule,
    MaskWrapperDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatepickerComponent {
  batata = {
    id: 1,
    name: 'Rio de Janeiro'
  };

  states = [
    {
      id: 1,
      name: 'Rio de Janeiro'
    },
    {
      id: 2,
      name: 'São Paulo'
    },
    {
      id: 3,
      name: 'Minas Gerais'
    },
  ]

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
