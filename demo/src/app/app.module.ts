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
  DropdownInputModule
} from '@universal-material/angular';

import {AppComponent} from './app.component';

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
    DialogModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
