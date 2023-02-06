import { Component, ElementRef } from '@angular/core';

import { DialogComponent } from '../dialog.component';

@Component({
  templateUrl: './progress-dialog.component.html'
})
export class ProgressDialogComponent extends DialogComponent {
  message: string | null = null;

  constructor(_elementRef: ElementRef) {
    super (_elementRef, {
      closeOnBackdropClick: false,
      closeOnEsc: false
    });
    _elementRef.nativeElement.classList.add('u-dialog-progress');
  }
}
