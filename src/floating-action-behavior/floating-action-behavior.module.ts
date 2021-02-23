import { NgModule } from '@angular/core';
import { FloatingActionBehaviorDirective } from './floating-action-behavior.directive';

export { FloatingActionBehaviorDirective }

@NgModule({
  declarations: [FloatingActionBehaviorDirective],
  exports: [FloatingActionBehaviorDirective]
})
export class FloatingActionBehaviorModule {

}
