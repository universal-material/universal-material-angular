import { Component } from '@angular/core';

import { TabChangeEvent } from '@universal-material/angular';

@Component({
  selector: 'app-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['./tabs-example.component.scss']
})
export class TabsExampleComponent {

  tabIndex: number;

  beforeChangeTab($event: TabChangeEvent) {
    if ($event.tabIndex === 2) {
      $event.preventDefault();
    }
  }
}
