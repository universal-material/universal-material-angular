import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  ConfirmDialogService,
  ProgressDialogComponent,
  ProgressDialogService,
  SnackbarService
} from '@universal-material/angular';

import { ExampleComponent } from '../../example/example.component';
import { SliderExampleComponent } from './slider-example/slider-example.component';

// @ts-ignore
import htmlCode from './slider-example/slider-example.component.html';
// @ts-ignore
import cssCode from './slider-example/slider-example.component.scss';
// @ts-ignore
import tsCode from './slider-example/slider-example.component.ts' with { loader: 'text' };

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ExampleComponent,
    SliderExampleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent {
  action = '';
  message = '';

  htmlCode = htmlCode;
  cssCode = cssCode;
  tsCode = tsCode;

  #snackbar = inject(SnackbarService);
  #confirmDialog = inject(ConfirmDialogService);
  #progressDialog = inject(ProgressDialogService);

  showSnackbar(): void {
    console.log(this.#snackbar);
    const confirmDialogRef = this.#progressDialog.open(this.message);


    setTimeout(() => confirmDialogRef.close(), 3000);
    // confirmDialogRef.onCancel.subscribe(() => alert('canceled'));
    // confirmDialogRef.onConfirm.subscribe(() => alert('confirmed'));
  }
}
