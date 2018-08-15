import {NgModule} from '@angular/core';

import {CircularProgressModule} from './circular-progress/circular-progress.module';
import {RippleModule} from './ripple/ripple.module';
import {TextFieldModule} from './text-field/text-field.module';

const UmdModules = [
  CircularProgressModule,
  RippleModule,
  TextFieldModule
];

export {Snackbar} from '@universal-material/core';
export {ProgressDialog} from '@universal-material/core';

@NgModule({
  imports: [UmdModules],
  exports: UmdModules
})
export class UmdModule {

}
