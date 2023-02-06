import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {Highlight} from './highlight';
import {TypeaheadWindow} from './typeahead-window';
import {Typeahead} from './typeahead';
import { RippleModule } from "../ripple/ripple.module";

export {Highlight} from './highlight';
export {TypeaheadWindow} from './typeahead-window';
export {TypeaheadConfig} from './typeahead-config';
export {Typeahead, TypeaheadSelectItemEvent} from './typeahead';

@NgModule({
  declarations: [Typeahead, Highlight, TypeaheadWindow],
  exports: [Typeahead, Highlight],
  imports: [CommonModule, RippleModule],
  entryComponents: [TypeaheadWindow]
})
export class TypeaheadModule {

}
