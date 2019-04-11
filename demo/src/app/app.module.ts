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
  SelectModule,
  ViewPagerModule,
  ToolbarBehaviorModule,
  FloatingActionBehaviorModule,
  ButtonModule, ChipFieldModule,
} from '@universal-material/angular';

import {AppComponent} from './app.component';
import { FORM_FIELD_DEFAULT_APPEARANCE } from '@universal-material/angular/form-field/form-field.component';
import { FormFieldModule } from '@universal-material/angular/form-field/form-field.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CircularProgressModule,
    DropdownModule,
    SelectModule,
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
    TextFieldModule,
    DropdownModule,
    FormFieldModule,
    ChipFieldModule,
    SelectModule
  ],
  providers: [
    {provide: FORM_FIELD_DEFAULT_APPEARANCE, useValue: 'outline'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
