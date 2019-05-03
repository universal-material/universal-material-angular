import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[uDialogBody]'
})
export class DialogBodyDirective {

  constructor(readonly _elementRef: ElementRef) { }

}
