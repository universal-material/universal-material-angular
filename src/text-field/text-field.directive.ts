import {Directive, ElementRef, AfterViewInit} from '@angular/core';
import {TextField} from '@universal-material/core';

@Directive({
  selector: '[umdTextField], .text-field'
})
export class TextFieldDirective implements AfterViewInit {

  constructor(private readonly elementRef: ElementRef) {

  }

  ngAfterViewInit(): void {
    const textField = new TextField(this.elementRef.nativeElement);
  }
}
