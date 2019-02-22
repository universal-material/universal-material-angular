import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FloatWhenScrollBehavior } from './float-when-scroll.behavior';

@Directive({
  selector: '[uToolbarBehavior]'
})
export class ToolbarBehaviorDirective implements OnInit, OnDestroy {
  private behavior: FloatWhenScrollBehavior;

  constructor(private readonly elementRef: ElementRef) {

  }

  ngOnDestroy(): void {
    this.behavior.destroy();
  }

  ngOnInit(): void {
    this.behavior = FloatWhenScrollBehavior.attach(window, this.elementRef.nativeElement);
  }
}
