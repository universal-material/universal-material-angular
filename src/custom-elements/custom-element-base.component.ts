import { Directive, ElementRef } from '@angular/core';

@Directive()
export abstract class CustomElementBaseComponent<T extends HTMLElement> {
  constructor(protected readonly elementRef: ElementRef<T>) {
  }
}
