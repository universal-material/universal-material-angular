import {Component, Input} from '@angular/core';

@Component({
  selector: 'u-circular-progress',
  template: `
            <div class="preloader-wrapper" [ngClass]="size">
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
                </div>
            </div>`
})
export class CircularProgressComponent {
  @Input() size: string;
}
