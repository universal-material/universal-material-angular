import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UniversalMaterialModule } from '@universal-material/angular';

@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss'],
  standalone: true,
  imports: [
    UniversalMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogExampleComponent {

  show: boolean = false;
}
