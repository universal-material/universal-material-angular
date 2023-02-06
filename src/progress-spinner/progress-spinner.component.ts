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
  @Input() size: string | null = null;

  constructor(private readonly elementRef: ElementRef) {
    elementRef.nativeElement.classList.add('preloader-wrapper');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['size']) {
      return;
    }

    const sizeChange = changes['size'];

    if (sizeChange.previousValue) {
      this.elementRef.nativeElement.classList.remove(sizeChange.previousValue);
    }

    if (sizeChange.currentValue) {
      this.elementRef.nativeElement.classList.add(sizeChange.currentValue);
    }
  }
}
