import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {
  DropdownModule,
  TextFieldModule,
  DialogModule,
  TypeaheadModule,
  CircularProgressModule,
  RippleModule,
  DropdownInputModule,
  ViewPagerModule,
  ToolbarBehaviorModule,
  FloatingActionBehaviorModule,
  ButtonModule,
} from '@universal-material/angular';

import {AppComponent} from './app.component';
import { TEXT_FIELD_DEFAULT_APPEARANCE } from '@universal-material/angular/shared/text-field-base.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CircularProgressModule,
    DropdownModule,
    DropdownInputModule,
    TextFieldModule,
    TypeaheadModule,
    ViewPagerModule,
    DialogModule,
    RippleModule,
    ToolbarBehaviorModule,
    FloatingActionBehaviorModule,
    ButtonModule,
    TextFieldModule,
    TextFieldModule,
    TextFieldModule,
    TextFieldModule
  ],
  providers: [
    {provide: TEXT_FIELD_DEFAULT_APPEARANCE, useValue: 'outline'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
