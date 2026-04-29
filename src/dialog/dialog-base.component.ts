import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  model,
  Output,
  signal,
  ViewChild
} from '@angular/core';

import { DialogBodyDirective } from "./dialog-body.directive";
import { AnimationEvents } from '../util/animations/animation-events';
import { DIALOG_DEFAULT_OPTIONS, DialogConfig } from './dialog-config.model';

export const DefaultDialogConfig: DialogConfig = {
  closeOnBackdropClick: true,
  closeOnEsc: true
};

@Component({
  selector: 'u-dialog-base',
  template: '',
  host: {
    '[class.hide]': '_hiding()',
    '[class.show]': 'show()',
  }
})
export class DialogBaseComponent {

  protected readonly _elementRef = inject(ElementRef);
  readonly #defaultOptions = inject(DIALOG_DEFAULT_OPTIONS, {optional: true});

  _dialogConfig = {...DefaultDialogConfig, ...this.#defaultOptions};

  protected readonly _hiding = signal(false);
  readonly show = model(false);
  @Output() afterClose = new EventEmitter();
  @Output() closedFromBackdrop = new EventEmitter();

  @ContentChild(DialogBodyDirective)
  set _contentChildBody(dialogBody: DialogBodyDirective) {
    this.#setDialogBody(dialogBody);
  }

  @ViewChild(DialogBodyDirective)
  set _viewChildBody(dialogBody: DialogBodyDirective) {
    this.#setDialogBody(dialogBody);
  }

  dialogBody: DialogBodyDirective | null = null;

  @HostBinding('tabindex') _tabIndex = -1;

  @HostBinding('class.u-dialog-scroll-top-divider') scrollTopDivider = false;
  @HostBinding('class.u-dialog-scroll-bottom-divider') scrollBottomDivider = false;

  constructor() {
    this._elementRef.nativeElement.classList.add('u-dialog');
  }

  #addAnimationEndEvents() {
    AnimationEvents.attachAnimationEndEvents(this._elementRef.nativeElement, this.#onAnimationEnd.bind(this));
  }

  #onAnimationEnd = (event: Event) => {
    this._elementRef.nativeElement.removeEventListener(event.type, this.#onAnimationEnd);
    this._hiding.set(false);
    this.afterClose.emit();
  }

  #setDialogBody(dialogBody: DialogBodyDirective): void {
    this.dialogBody = dialogBody;

    if (!this.dialogBody) {
      return;
    }

    this.dialogBody.dialog = this;
    this.dialogBody._processBehavior();
  }

  protected backdropClick() {
    if (this._dialogConfig.closeOnBackdropClick) {
      this.close();
      this.closedFromBackdrop.emit();
    }
  }

  close() {

    if (!this.show()) {
      return;
    }

    this.show.set(false);
    this._hiding.set(true);
    this.#addAnimationEndEvents();
  }
}
