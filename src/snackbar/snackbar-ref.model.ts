import { Observable } from 'rxjs';

export interface SnackbarRef {
  message: string;
  action?: string;

  onAction: Observable<Event>;

  dismiss(): void;
}
