import { Component, ContentChild, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DialogBodyDirective } from './dialog-body.directive';

@Component({
  selector: 'u-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  private static readonly _animationEvents = ['webkitAnimationEnd', 'oanimationend', 'msAnimationEnd', 'animationend'];

  @HostBinding('class.hide') _hiding = false;
  @HostBinding('class.show') @Input() show: boolean;
  @Output() showChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter();

  @ContentChild(DialogBodyDirective) dialogBody: DialogBodyDirective;

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

  constructor(private readonly _elementRef: ElementRef) {
    _elementRef.nativeElement.classList.add('u-dialog');
  }

  private addAnimationEndEvents() {
    DialogComponent._animationEvents.forEach(eventName => {
      this._elementRef.nativeElement.addEventListener(eventName, this.onAnimationEnd.bind(this));
    });
  }

  private onAnimationEnd = (event: Event) => {
    this._elementRef.nativeElement.removeEventListener(event.type, this.onAnimationEnd);
    this._hiding = false;
    this.closed.emit();
  }

  close() {
    this.show = false;
    this.showChange.emit(false);
    this._hiding = true;
    this.addAnimationEndEvents();
  }
}
