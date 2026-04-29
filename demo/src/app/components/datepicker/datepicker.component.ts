import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ExampleComponent } from '../../example/example.component';
import { DatepickerExampleComponent } from './datepicker-example/datepicker-example.component';
import { UniversalMaterialModule } from '@universal-material/angular/index';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// @ts-ignore
import htmlCode from './datepicker-example/datepicker-example.component.html';
// @ts-ignore
import cssCode from './datepicker-example/datepicker-example.component.scss';
// @ts-ignore
import tsCode from './datepicker-example/datepicker-example.component.ts' with { loader: 'text' };

enum Batata {
  Frita,
  Assada,
  Rostie
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExampleComponent,
    DatepickerExampleComponent,
    UniversalMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DatepickerComponent {
  renderExtraState = true;
  batata: typeof this.states[0] | null = {
    id: 1,
    name: 'Rio de Janeiro'
  };

  batata2 = Batata.Assada;
  Batata = Batata;

  states = [
    {
      id: 1,
      name: 'Rio de Janeiro'
    },
    {
      id: 2,
      name: 'São Paulo'
    },
  ]

  extraState =
    {
      id: 3,
      name: 'Minas Gerais'
    };

  compareStates(state1: any, state2: any) {
    return state1?.id === state2?.id;
  }

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;
}
