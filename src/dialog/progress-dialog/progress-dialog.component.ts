import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

import { DialogComponent } from '../dialog.component';
import { DIALOG_DEFAULT_OPTIONS } from '../dialog-config.model';

@Component({
  selector: 'u-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styles: [
    `
      u-circular-progress {
        margin-inline: 0;
      }
    `
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DIALOG_DEFAULT_OPTIONS,
      useValue: {
        closeOnBackdropClick: false,
        closeOnEsc: false
      }
    }
  ]
})
export class ProgressDialogComponent extends DialogComponent {
  readonly message = signal<string | null>(null);

  constructor() {
    super();
    this._elementRef.nativeElement.classList.add('u-dialog-progress');
  }
}
