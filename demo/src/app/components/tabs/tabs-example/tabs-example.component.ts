import { Component } from '@angular/core';

import { BeforeTabChangeEvent, TabChangeEvent } from '@universal-material/angular';

@Component({
  selector: 'app-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['./tabs-example.component.scss']
})
export class TabsExampleComponent {

  tabIndex: number | null = null;
  tabId: any;

  beforeChangeTab($event: BeforeTabChangeEvent) {
    if ($event.tabIndex === 2) {
      $event.preventDefault();
    }
  }

  afterChangeTab($event: TabChangeEvent) {
    this.tabId = $event.tabId;
  }
}
