import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DropdownModule, TextFieldModule, DialogModule, CircularProgressModule, RippleModule} from '@universal-material/angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CircularProgressModule,
    DropdownModule,
    TextFieldModule,
    DialogModule,
    RippleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
