import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonModule,
  ChipFieldModule,
  ProgressSpinnerModule,
  DialogModule,
  DropdownModule,
  FloatingActionBehaviorModule,
  RippleModule,
  SelectModule,
  TextFieldModule,
  ToolbarBehaviorModule,
  TypeaheadModule,
  ViewPagerModule,
  SliderModule,
  CircularProgressModule
} from '@universal-material/angular';

import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

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
import { SelectionControlsExampleComponent } from './components/selection-controls/selection-controls-example/selection-controls-example.component';
import { DatepickerModule } from '@universal-material/angular/datepicker/datepicker.module';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { DatepickerExampleComponent } from './components/datepicker/datepicker-example/datepicker-example.component';
import { SelectComponent } from './components/select/select.component';
import { SelectExampleComponent } from './components/select/select-example/select-example.component';
import { RipplesComponent } from './components/ripples/ripples.component';
import { RipplesExampleComponent } from './components/ripples/ripples-example/ripples-example.component';
import { ChipInputComponent } from './components/chip-input/chip-input.component';
import { ChipInputExampleComponent } from './components/chip-input/chip-input-example/chip-input-example.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabsExampleComponent } from './components/tabs/tabs-example/tabs-example.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { TypeaheadExampleComponent } from './components/typeahead/typeahead-example/typeahead-example.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ProgressSpinnerExampleComponent } from './components/progress-spinner/progress-spinner-example/progress-spinner-example.component';
import { ProgressDialogComponent } from './components/progress-dialog/progress-dialog.component';
import { ProgressDialogExampleComponent } from './components/progress-dialog/progress-dialog-example/progress-dialog-example.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogExampleComponent } from './components/confirm-dialog/confirm-dialog-example/confirm-dialog-example.component';
import { CollapseModule } from '@universal-material/angular/collapse/collapse.module';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ExpansionPanelExampleComponent } from './components/expansion-panel/expansion-panel-example/expansion-panel-example.component';
import { ExpansionPanelModule } from '@universal-material/angular/expansion-panel/expansion-panel.module';
import { SliderComponent } from './components/slider/slider.component';
import { SliderExampleComponent } from './components/slider/slider-example/slider-example.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogExampleComponent } from "./components/dialog/dialog-example/dialog-example.component";

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
    SelectExampleComponent,
    RipplesComponent,
    RipplesExampleComponent,
    ChipInputComponent,
    ChipInputExampleComponent,
    TabsComponent,
    TabsExampleComponent,
    TypeaheadComponent,
    TypeaheadExampleComponent,
    ProgressSpinnerComponent,
    ProgressSpinnerExampleComponent,
    ProgressDialogComponent,
    ProgressDialogExampleComponent,
    ConfirmDialogComponent,
    ConfirmDialogExampleComponent,
    ExpansionPanelComponent,
    ExpansionPanelExampleComponent,
    SliderComponent,
    SliderExampleComponent,
    DialogComponent,
    DialogExampleComponent
  ],
  imports: [
    AppRoutingModule,
    HighlightModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ProgressSpinnerModule,
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
    SliderModule,
    FormFieldModule,
    ChipFieldModule,
    SelectModule,
    TypeaheadModule,
    TextFieldModule,
    TabBarModule,
    SnackbarModule,
    CollapseModule,
    ExpansionPanelModule,
    CircularProgressModule
  ],
  providers: [
    {provide: FORM_FIELD_DEFAULT_APPEARANCE, useValue: 'box'},
    // {
    //   provide: DATEPICKER_DEFAULT_OPTIONS,
    //   useValue: {
    //     clearLabel: 'Clear date',
    //   }
    // }
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        // @ts-ignore
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        // @ts-ignore
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          // @ts-ignore
          typescript: () => import('highlight.js/lib/languages/typescript'),
          // @ts-ignore
          scss: () => import('highlight.js/lib/languages/scss'),
          // @ts-ignore
          xml: () => import('highlight.js/lib/languages/xml')
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
