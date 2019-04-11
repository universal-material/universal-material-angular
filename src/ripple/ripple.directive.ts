import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { RippleConfig } from '@universal-material/core';

@Directive({
  selector: '[uRipple]'
})
export class RippleDirective {

  @Input() rippleConfig: RippleConfig = {};
  disabled = false;
  isTouching = false;

  constructor(private readonly _elementRef: ElementRef,
              @Inject(DOCUMENT) private document: any) {


    if (document.defaultView.getComputedStyle(_elementRef.nativeElement).position !== 'absolute' &&
        document.defaultView.getComputedStyle(_elementRef.nativeElement).position !== 'fixed') {
      _elementRef.nativeElement.style.position = 'relative';
    }
  }

  private static _setElementSquareSizeAndCenter(element: HTMLElement, size: number) {
    element.style.top = '50%';
    element.style.left = '50%';
    element.style.width = size + 'px';
    element.style.height = size + 'px';
    element.style.marginLeft = -size / 2 + 'px';
    element.style.marginTop = -size / 2 + 'px';
  }

  @HostListener('mousedown', ['$event']) _mousedown = (e: MouseEvent) => {
    if (!this.isTouching) {
      this.createRipple('mouseup', null, e.clientX, e.clientY);
    }
  }

  @HostListener('touchstart', ['$event']) _touchstart = (e: TouchEvent) => {
    this.isTouching = true;
    this.createRipple('touchend', () => {
      setTimeout(() => {
        this.isTouching = false;
      }, 100);
    }, e.touches[0].clientX, e.touches[0].clientY);
  }


  createRipple(releaseEventName: string, releaseCallback: Function, pageX: number, pageY: number) {
    if (this.disabled) { return; }

    const rippleWrapper = document.createElement('DIV');
    rippleWrapper.classList.add('u-ripple-wrapper');

    const ripple = document.createElement('DIV');
    ripple.classList.add('u-ripple');
    rippleWrapper.appendChild(ripple);
    this._elementRef.nativeElement.insertAdjacentElement('afterbegin', rippleWrapper);

    if (this.rippleConfig.size) {
      RippleDirective._setElementSquareSizeAndCenter(rippleWrapper, this.rippleConfig.size);
    }

    if (this.rippleConfig.borderRadius) {
      rippleWrapper.style.borderRadius = this.rippleConfig.borderRadius;
    }

    const release = function () {
      ripple.classList.add('dismiss');

      if (releaseCallback) {
        releaseCallback();
      }
    };

    window.addEventListener(releaseEventName, release);
    this._elementRef.nativeElement.addEventListener('dragover', release);

    ripple.addEventListener('transitionend', () => {
      if (ripple.classList.contains('dismiss')) {
        this._elementRef.nativeElement.removeChild(rippleWrapper);
        this._elementRef.nativeElement.removeEventListener('dragover', release);
        window.removeEventListener(releaseEventName, release);
      }
    });

    requestAnimationFrame(() => {
      const clientRect = this._elementRef.nativeElement.getBoundingClientRect();
      const largestDimensionSize = Math.max(rippleWrapper.clientWidth, rippleWrapper.clientHeight);
      const rippleSize = this.rippleConfig.size || largestDimensionSize * 2;
      RippleDirective._setElementSquareSizeAndCenter(ripple, rippleSize);
      ripple.style.transitionDuration = (1080 * Math.pow(rippleSize, 0.3)) + 'ms, 750ms';

      const x = (pageX - clientRect.left) + ((rippleSize - this._elementRef.nativeElement.clientWidth) / 2);
      const y = (pageY - clientRect.top) + ((rippleSize - this._elementRef.nativeElement.clientHeight) / 2);

      ripple.style.transformOrigin = x + 'px ' + y + 'px';
      ripple.classList.add('show');
    });
  }
}
