import { Directive } from '@angular/core';

import { ScrollBehavior } from "../util/scroll-behavior";

@Directive()
export abstract class ToolbarBehavior extends ScrollBehavior {
  override defaultTarget = window;

  constructor() {
    super();
  }
}
