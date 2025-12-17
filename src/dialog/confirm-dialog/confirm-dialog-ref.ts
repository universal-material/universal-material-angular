import { Observable } from 'rxjs';

export interface ConfirmDialogRef {
  onCancel: Observable<void>;
  onConfirm: Observable<void>;
}
