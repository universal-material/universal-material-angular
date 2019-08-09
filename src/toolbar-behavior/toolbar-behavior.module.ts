import { NgModule } from '@angular/core';

import { ToolbarElevateWhenScrollDirective } from './toolbar-elevate-when-scroll.directive';
import { ToolbarHideWhenScrollDirective } from './toolbar-hide-when-scroll.directive';
import { CollapsibleToolbarComponent } from './collapsible-toolbar/collapsible-toolbar.component';

export { ToolbarElevateWhenScrollDirective, ToolbarElevateWhenScrollOptions } from './toolbar-elevate-when-scroll.directive';
export { ToolbarHideWhenScrollDirective, ToolbarHideWhenScrollOptions } from './toolbar-hide-when-scroll.directive';
export { CollapsibleToolbarComponent } from './collapsible-toolbar/collapsible-toolbar.component';

@NgModule({
  declarations: [
    ToolbarElevateWhenScrollDirective,
    ToolbarHideWhenScrollDirective,
    CollapsibleToolbarComponent
  ],
  exports: [
    ToolbarElevateWhenScrollDirective,
    ToolbarHideWhenScrollDirective,
    CollapsibleToolbarComponent
  ]
})
export class ToolbarBehaviorModule {

}
