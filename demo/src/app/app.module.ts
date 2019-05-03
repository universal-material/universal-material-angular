import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import {TabBarModule} from '@universal-material/angular/tab-bar/tab-bar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    DropdownModule,
    FormFieldModule,
    ChipFieldModule,
    SelectModule,
    TypeaheadModule,
    TextFieldModule,
    TabBarModule
  ],
  providers: [
    {provide: FORM_FIELD_DEFAULT_APPEARANCE, useValue: 'box'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
