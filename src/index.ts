import {NgModule} from '@angular/core';

import {RippleModule} from './ripple/ripple.module';
import {TextFieldModule} from './text-field/text-field.module';

const UmdModules = [
  RippleModule,
  TextFieldModule
];

export {Snackbar} from 'universal-material';

@NgModule({
  imports: [UmdModules],
  exports: UmdModules
})
export class UmdModule {

}
