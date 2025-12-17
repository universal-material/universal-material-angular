import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';

import { ExampleComponent } from '../../example/example.component';
import { SliderExampleComponent } from './slider-example/slider-example.component';

// @ts-ignore
import htmlCode from '!raw-loader!./slider-example/slider-example.component.html';
// @ts-ignore
import cssCode from '!raw-loader!./slider-example/slider-example.component.scss';
// @ts-ignore
import tsCode from '!raw-loader!./slider-example/slider-example.component.ts';
import { FormsModule } from '@angular/forms';
import { SnackbarDuration, UmSnackbar } from '@universal-material/web';
import { ConfirmDialogService, SnackbarService } from '@universal-material/angular';

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

  showSnackbar(): void {
    console.log(this.#snackbar);
    const confirmDialogRef = this.#confirmDialog.open(this.message, {
      title: 'Headline',
      confirmButton: {
        text: 'Year, sure',
      },
      cancelButton: {
        text: 'Nope',
      }
    });


    confirmDialogRef.onCancel.subscribe(() => alert('canceled'));
    confirmDialogRef.onConfirm.subscribe(() => alert('confirmed'));
  }
}
