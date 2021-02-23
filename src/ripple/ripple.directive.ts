import { AfterViewInit, Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { RippleConfig } from './ripple-config.model';

@Directive({
  selector: '[uRipple]'
})
export class RippleDirective implements AfterViewInit {

  @Input() rippleConfig: RippleConfig = {};
  disabled = false;
  isTouching = false;

  constructor(protected readonly _elementRef: ElementRef<HTMLElement>,
              @Inject(DOCUMENT) private document: any) {
  }

  private static _setElementSquareSizeAndCenter(element: HTMLElement, size: number) {
    element.style.top = '50%';
    element.style.left = '50%';
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.marginLeft = `${-size / 2}px`;
    element.style.marginTop = `${-size / 2}px`;
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

  ngAfterViewInit(): void {
    if (document.defaultView!.getComputedStyle(this._elementRef.nativeElement).position !== 'absolute' &&
      document.defaultView!.getComputedStyle(this._elementRef.nativeElement).position !== 'fixed' &&
      (!this.rippleConfig || !this.rippleConfig.dontChangePositioning)) {
      this._elementRef.nativeElement.style.position = 'relative';
    }
  }

  createRipple(releaseEventName: string, releaseCallback: Function | null, pageX: number, pageY: number) {
    if (this.disabled ||
      this._elementRef.nativeElement.hasAttribute('disabled') ||
      this._elementRef.nativeElement.classList.contains('disabled')) {
      return;
    }

    let release: () => void;

    const cancelRippleIfNecessary = () => {

      this._elementRef.nativeElement.removeEventListener("touchmove", cancelRippleIfNecessary);
      window.removeEventListener(releaseEventName, cancelRippleIfNecessary);

      if (release) {
        release();
      }
    };

    this._elementRef.nativeElement.addEventListener("touchmove", cancelRippleIfNecessary);
    window.addEventListener(releaseEventName, cancelRippleIfNecessary);

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

    release = () => {
      ripple.classList.add('dismiss');

      if (releaseCallback) {
        releaseCallback();
      }
    };

    this._elementRef.nativeElement.addEventListener('dragover', release);
    this._elementRef.nativeElement.addEventListener('mouseleave', release);

    ripple.addEventListener('transitionend', () => {
      if (ripple.classList.contains('dismiss')) {
        this._elementRef.nativeElement.removeChild(rippleWrapper);
        this._elementRef.nativeElement.removeEventListener('dragover', release);
        this._elementRef.nativeElement.removeEventListener('mouseleave', release);
      }
    });

    requestAnimationFrame(() => {
      const clientRect = this._elementRef.nativeElement.getBoundingClientRect();
      const largestDimensionSize = Math.max(rippleWrapper.clientWidth, rippleWrapper.clientHeight);
      const rippleSize = this.rippleConfig.size || largestDimensionSize * 2;
      RippleDirective._setElementSquareSizeAndCenter(ripple, rippleSize);
      ripple.style.transitionDuration = `${1080 * Math.pow(rippleSize, 0.3)}ms, 750ms`;

      const x = (pageX - clientRect.left) + ((rippleSize - this._elementRef.nativeElement.clientWidth) / 2);
      const y = (pageY - clientRect.top) + ((rippleSize - this._elementRef.nativeElement.clientHeight) / 2);

      ripple.style.transformOrigin = `${x}px ${y}px`;
      ripple.classList.add('show');
    });
  }
}
