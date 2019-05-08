import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Inject, Input, Optional, Output, ViewChild } from '@angular/core';

import { DialogBodyDirective } from './dialog-body.directive';
import { AnimationEvents } from '../util/animations/animation-events';
import { DIALOG_DEFAULT_OPTIONS, DialogConfig } from './dialog-config.model';

export const DefaultDialogConfig: DialogConfig = {
  closeOnBackdropClick: true,
  closeOnEsc: true
};

@Component({
  selector: 'u-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  _dialogConfig: DialogConfig;

  @HostBinding('class.hide') _hiding = false;
  @HostBinding('class.show') @Input() show: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() afterClose = new EventEmitter();

  @ContentChild(DialogBodyDirective) dialogBody: DialogBodyDirective;

  @HostBinding('tabindex') _tabIndex = -1;
  @HostBinding('class.u-dialog-scroll-top-divider') get scrollTopDivider() {
    return this.dialogBody
      ? this.dialogBody._elementRef.nativeElement.scrollTop
      : false;
  }

  @HostBinding('class.u-dialog-scroll-bottom-divider') get scrollBottomDivider() {

    if (!this.dialogBody) {
      return false;
    }

    const scrollBottom = this.dialogBody._elementRef.nativeElement.scrollTop + this.dialogBody._elementRef.nativeElement.offsetHeight;

    return scrollBottom !== this.dialogBody._elementRef.nativeElement.scrollHeight;
  }

  constructor(protected readonly _elementRef: ElementRef,
              @Optional() @Inject(DIALOG_DEFAULT_OPTIONS) defaultOptions?: DialogConfig) {
    this._dialogConfig = {...DefaultDialogConfig, ...defaultOptions};
    _elementRef.nativeElement.classList.add('u-dialog');
  }

  private addAnimationEndEvents() {
    AnimationEvents.attachAnimationEndEvents(this._elementRef.nativeElement, this.onAnimationEnd.bind(this));
  }

  private onAnimationEnd = (event: Event) => {
    this._elementRef.nativeElement.removeEventListener(event.type, this.onAnimationEnd);
    this._hiding = false;
    this.afterClose.emit();
  }

  backdropClick() {
    if (this._dialogConfig.closeOnBackdropClick) {
      this.close();
    }
  }

  close() {

    if (!this.show) {
      return;
    }

    this.show = false;
    this.showChange.emit(false);
    this._hiding = true;
    this.addAnimationEndEvents();
  }
}
