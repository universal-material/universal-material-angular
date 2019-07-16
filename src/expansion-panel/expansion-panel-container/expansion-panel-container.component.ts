import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExpansionPanelComponent } from '../expansion-panel.component';

@Component({
  selector: 'u-expansion-panel-container',
  templateUrl: './expansion-panel-container.component.html',
  styleUrls: ['./expansion-panel-container.component.scss']
})
export class ExpansionPanelContainerComponent implements AfterContentInit {

  @Input() multi = false;
  @ContentChildren(ExpansionPanelComponent) _panels: QueryList<ExpansionPanelComponent>;

  private _childrenOpenSubscriptions: Subscription[] = [];

  ngAfterContentInit(): void {
    this._updatePanels(this._panels);
    this._panels.changes.subscribe(panels => {
      this._updatePanels(panels);
    });
  }

  _toggle = (panel: ExpansionPanelComponent) => {
    if (!panel.open || this.multi) {
      return;
    }

    for (const p of this._panels.toArray()) {
      if (p === panel) {
        continue;
      }

      p.open = false;
    }
  }

  private _updatePanels(panels: QueryList<ExpansionPanelComponent>) {
    for (const subscription of this._childrenOpenSubscriptions) {
      subscription.unsubscribe();
    }

    this._childrenOpenSubscriptions.length = 0;
    for (const panel of panels.toArray()) {
      this._childrenOpenSubscriptions.push(panel._toggleChange.subscribe(this._toggle));
    }
  }
}
