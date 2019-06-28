import { Component, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'u-progress-spinner',
  template: `
<div class="spinner-layer">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div>
  <div class="gap-patch">
    <div class="circle"></div>
  </div>
  <div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>`
})
export class ProgressSpinnerComponent implements OnChanges {
  @Input() size: string;

  constructor(private readonly elementRef: ElementRef) {
    elementRef.nativeElement.classList.add('preloader-wrapper');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.size) {
      if (changes.size.previousValue) {
        this.elementRef.nativeElement.classList.remove(changes.size.previousValue);
      }

      if (changes.size.currentValue) {
        this.elementRef.nativeElement.classList.add(changes.size.currentValue);
      }
    }
  }
}
