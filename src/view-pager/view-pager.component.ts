import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import * as Dragdealer from 'dragdealer';

import {ViewPagerSlideComponent} from './view-pager-slide.component';

const speed = 0.3;

@Component({
  selector: 'u-view-pager',
  templateUrl: './view-pager.component.html',
  styleUrls: ['./view-pager.component.css']
})
export class ViewPagerComponent implements AfterViewInit, AfterContentInit, OnDestroy, OnChanges {

  @Input() selectedIndex = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  @ContentChildren(ViewPagerSlideComponent) _slides: QueryList<ViewPagerSlideComponent>;

  private dragdealer;
  slideCount: number;

  constructor(private readonly elementRef: ElementRef) {

  }

  private reflowDragdealer = () => {
    this.dragdealer.reflow();
  }

  private setActiveSlide() {
    this._slides.forEach((slide, index) => slide.isActive = index === this.selectedIndex);
  }

  ngAfterViewInit(): void {
    this.dragdealer = new Dragdealer(this.elementRef.nativeElement, {
      steps: this.slideCount,
      speed: speed,
      loose: true,
      requestAnimationFrame: true,
      callback: (x, y) => {
        this.selectedIndex = x;
        this.selectedIndexChange.emit(x);
        this.setActiveSlide();
      }
    });

    window.addEventListener('resize', this.reflowDragdealer);
  }

  ngAfterContentInit(): void {
    this.slideCount = this._slides.length;
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.reflowDragdealer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedIndex) {
      if (this.dragdealer) {
        this.dragdealer.setStep(changes.selectedIndex.currentValue + 1);
      }

      if (this._slides) {
        this.setActiveSlide();
      }
    }
  }
}
