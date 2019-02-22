import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { HideWhenScrollDownBehavior } from './hide-when-scroll-down.behavior';

@Directive({
  selector: '[uFloatingActionBehavior]'
})
export class FloatingActionBehaviorDirective implements OnInit, OnDestroy {
  private behavior: HideWhenScrollDownBehavior;

  constructor(private readonly elementRef: ElementRef) {

  }

  ngOnDestroy(): void {
    this.behavior.destroy();
  }

  ngOnInit(): void {
    this.behavior = HideWhenScrollDownBehavior.attach(window, this.elementRef.nativeElement);
  }
}
