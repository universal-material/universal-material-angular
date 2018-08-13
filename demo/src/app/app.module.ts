import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {UmdModule} from '@universal-material/angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UmdModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
