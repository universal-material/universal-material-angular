import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CircularProgressComponent} from './circular-progress.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [CircularProgressComponent],
  exports: [CircularProgressComponent]
})
export class CircularProgressModule {

}
