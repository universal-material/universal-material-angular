import { Component, Input } from '@angular/core';
import { SelectionControlAppearance } from './selection-control-appearance';

@Component({
  selector: 'u-selection-control',
  templateUrl: './selection-control.component.html',
  styleUrls: ['./selection-control.component.scss']
})
export class SelectionControlComponent {

  @Input() appearance: string;
  @Input() label: string;

  SelectionControlAppearance = SelectionControlAppearance;
}
