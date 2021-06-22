import {
  AfterContentInit,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Optional,
  Output,
  ViewChild
} from '@angular/core';

import { DialogBodyDirective } from "./dialog-body.directive";
import { AnimationEvents } from '../util/animations/animation-events';
import { DIALOG_DEFAULT_OPTIONS, DialogConfig } from './dialog-config.model';

export const DefaultDialogConfig: DialogConfig = {
  closeOnBackdropClick: true,
  closeOnEsc: true
};

@Directive()
export class DialogBaseComponent implements AfterContentInit {
  private _contentInitialized = false;

  _dialogConfig: DialogConfig;

  @HostBinding('class.hide') _hiding = false;
  @HostBinding('class.show') @Input() show: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() afterClose = new EventEmitter();
  @Output() closedFromBackdrop = new EventEmitter();

  @ContentChild(DialogBodyDirective)
  set _contentChildBody(dialogBody: DialogBodyDirective) {
    this.setDialogBody(dialogBody);
  }

  @ViewChild(DialogBodyDirective)
  set _viewChildBody(dialogBody: DialogBodyDirective) {
    this.setDialogBody(dialogBody);
  }

  dialogBody: DialogBodyDirective;

  @HostBinding('tabindex') _tabIndex = -1;

  @HostBinding('class.u-dialog-scroll-top-divider') scrollTopDivider: boolean;
  @HostBinding('class.u-dialog-scroll-bottom-divider') scrollBottomDivider: boolean;

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

  private setDialogBody(dialogBody: DialogBodyDirective): void {
    this.dialogBody = dialogBody;

    if (!this.dialogBody) {
      return;
    }

    this.dialogBody.dialog = this;
    this.dialogBody._processBehavior();
  }

  backdropClick() {
    if (this._dialogConfig.closeOnBackdropClick) {
      this.close();
      this.closedFromBackdrop.emit();
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

  ngAfterContentInit(): void {
    setTimeout(() => this._contentInitialized = true, 100);
  }
}
