import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { $ExampleComponentNameComponent } from './$example-component-name.component';
import { UniversalMaterialModule } from '@universal-material/angular';

@NgModule({
  declarations: [AppComponent, $ExampleComponentNameComponent],
  imports: [BrowserModule, FormsModule, UniversalMaterialModule],
  bootstrap: [AppComponent]
})
export class AppModule {

}
