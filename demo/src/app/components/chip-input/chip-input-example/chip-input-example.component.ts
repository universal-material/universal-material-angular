import { Component } from '@angular/core';

@Component({
  selector: 'app-chip-input-example',
  templateUrl: './chip-input-example.component.html',
  styleUrls: ['./chip-input-example.component.scss']
})
export class ChipInputExampleComponent {

  items: any[] = [];

  removeItem(index: number) {
    this.items.splice(index, 1);
  }
}
