import { Observable } from 'rxjs';

export interface SnackbarRef {
  message: string;
  action?: string;

  afterOpen: Observable<void>;
  afterDismiss: Observable<void>;
  onAction: Observable<void>;

  dismiss();
}
