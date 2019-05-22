import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonModule,
  ChipFieldModule,
  CircularProgressModule,
  DialogModule,
  DropdownModule,
  FloatingActionBehaviorModule,
  RippleModule,
  SelectModule,
  TextFieldModule,
  ToolbarBehaviorModule,
  TypeaheadModule,
  ViewPagerModule,
} from '@universal-material/angular';

import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

import { AppComponent } from './app.component';
import { FORM_FIELD_DEFAULT_APPEARANCE } from '@universal-material/angular/form-field/form-field.component';
import { FormFieldModule } from '@universal-material/angular/form-field/form-field.module';
import { TabBarModule } from '@universal-material/angular/tab-bar/tab-bar.module';
import { SnackbarModule } from '@universal-material/angular/snackbar/snackbar.module';
import { ButtonsExampleComponent } from './components/buttons/buttons-example/buttons-example.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ExampleComponent } from './example/example.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SimpleSnackbarExampleComponent } from './components/snackbar/simple-snackbar-example/simple-snackbar-example.component';
import { InputComponent } from './components/input/input.component';
import { TextFieldExampleComponent } from './components/input/text-field-example/text-field-example.component';
import { SelectionControlModule } from '@universal-material/angular/selection-control/selection-control.module';
import { SelectionControlsComponent } from './components/selection-controls/selection-controls.component';
import {
  SelectionControlsExampleComponent
} from './components/selection-controls/selection-controls-example/selection-controls-example.component';
import { DatepickerModule } from '@universal-material/angular/datepicker/datepicker.module';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerExampleComponent } from './components/datepicker/datepicker-example/datepicker-example.component';
import { DATEPICKER_DEFAULT_OPTIONS } from '@universal-material/angular/datepicker/datepicker-config.model';
import { SelectComponent } from './components/select/select.component';
import { SelectExampleComponent } from './components/select/select-example/select-example.component';


/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml}
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    ButtonsExampleComponent,
    NavigationComponent,
    ButtonsComponent,
    ExampleComponent,
    SnackbarComponent,
    SimpleSnackbarExampleComponent,
    InputComponent,
    TextFieldExampleComponent,
    SelectionControlsComponent,
    SelectionControlsExampleComponent,
    DatepickerComponent,
    DatepickerExampleComponent,
    SelectComponent,
    SelectExampleComponent
  ],
  imports: [
    AppRoutingModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
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
    SelectionControlModule,
    DatepickerModule,
    ButtonModule,
    TextFieldModule,
    DropdownModule,
    FormFieldModule,
    ChipFieldModule,
    SelectModule,
    TypeaheadModule,
    TextFieldModule,
    TabBarModule,
    SnackbarModule
  ],
  providers: [
    {provide: FORM_FIELD_DEFAULT_APPEARANCE, useValue: 'box'},
    // {
    //   provide: DATEPICKER_DEFAULT_OPTIONS,
    //   useValue: {
    //     clearLabel: 'Clear date'
    //   }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
