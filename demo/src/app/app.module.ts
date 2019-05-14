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
    ExampleComponent
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
    {provide: FORM_FIELD_DEFAULT_APPEARANCE, useValue: 'box'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
