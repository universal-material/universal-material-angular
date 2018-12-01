import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

export {ViewPagerComponent} from './view-pager.component';
export {ViewPagerSlideComponent} from './view-pager-slide.component';

import {ViewPagerComponent} from './view-pager.component';
import {ViewPagerSlideComponent} from './view-pager-slide.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ViewPagerSlideComponent, ViewPagerComponent],
  exports: [ViewPagerSlideComponent, ViewPagerComponent]
})
export class ViewPagerModule { }
