import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog.component';
import { DialogBodyDirective } from './dialog-body.directive';

@NgModule({
  declarations: [DialogComponent, DialogBodyDirective],
  exports: [DialogComponent, DialogBodyDirective]
})
export class DialogModule {
}
