import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FloatWhenScrollBehavior } from './float-when-scroll.behavior';

@Directive({
  selector: '[uToolbarBehavior]'
})
export class ToolbarBehaviorDirective implements OnInit, OnDestroy {
  private behavior: FloatWhenScrollBehavior;
  @Input() scrollContainer: HTMLElement;

  constructor(private readonly elementRef: ElementRef) {
    this.elementRef.nativeElement.style.transition = 'box-shadow 150ms';
  }

  ngOnDestroy(): void {
    this.behavior.destroy();
  }

  ngOnInit(): void {
    this.behavior = FloatWhenScrollBehavior.attach(this.scrollContainer || window, this.elementRef.nativeElement);
  }
}
