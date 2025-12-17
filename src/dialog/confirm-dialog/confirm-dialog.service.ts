import { Injectable } from '@angular/core';
import { ConfirmDialogConfig } from './confirm-dialog-config.model';
import { ConfirmDialogBuilder, UmButtonColor, UmButtonVariant } from '@universal-material/web';
import { ConfirmDialogRef } from './confirm-dialog-ref';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ConfirmDialogService {
  open(message: string, config?: ConfirmDialogConfig): ConfirmDialogRef {
    const builder = ConfirmDialogBuilder.create(message);

    if (!config) {
      return this.#open(builder);
    }

    if (config.confirmButton) {
      builder.confirmButton({
        label: config.confirmButton.text,
        variant: config.confirmButton.variant as UmButtonVariant ?? 'text',
        color: config.confirmButton.color as UmButtonColor
      })
    }

    if (config.cancelButton) {
      builder.cancelButton({
        label: config.cancelButton.text,
        variant: config.cancelButton.variant as UmButtonVariant ?? 'text',
        color: config.cancelButton.color as UmButtonColor
      })
    }

    if (config.title) {
      builder.headline(config.title);
    }

    return this.#open(builder);
  }

  #open(builder: ConfirmDialogBuilder): ConfirmDialogRef {
    const result$ = fromPromise(builder.show());

    return {
      onConfirm: result$
        .pipe(filter(confirmed => confirmed)) as Observable<any>,
      onCancel: result$
        .pipe(filter(confirmed => !confirmed)) as Observable<any>
    }
  }
}
