import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '../button/button.module';

import { SnackbarComponent } from './snackbar.component';

export { SnackbarConfig, SNACKBAR_DEFAULT_OPTIONS } from './snackbar-config.model';
export { SnackbarDuration } from './snackbar-duration';
export { SnackbarService } from './snackbar.service';
export { SnackbarRef } from './snackbar-ref.model';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  declarations: [SnackbarComponent],
  entryComponents: [SnackbarComponent]
})
export class SnackbarModule { }
