import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'u-view-pager-slide',
  templateUrl: './view-pager-slide.component.html',
  styleUrls: ['./view-pager-slide.component.css']
})
export class ViewPagerSlideComponent {
  @HostBinding('class.active') isActive: boolean;
}
