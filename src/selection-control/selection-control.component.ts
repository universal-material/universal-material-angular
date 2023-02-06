import { Component, Input } from '@angular/core';
import { SelectionControlAppearance } from './selection-control-appearance';

@Component({
  selector: 'u-selection-control',
  templateUrl: './selection-control.component.html',
  styleUrls: ['./selection-control.component.scss']
})
export class SelectionControlComponent {

  @Input() appearance: string | null = null;
  @Input() label: string | null = null;

  SelectionControlAppearance = SelectionControlAppearance;
}
