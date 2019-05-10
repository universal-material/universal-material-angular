import { ApplicationRef, ComponentFactory, ComponentFactoryResolver, Inject, Injectable, Injector, Optional } from '@angular/core';

import { SnackbarComponent } from './snackbar.component';
import { SNACKBAR_DEFAULT_OPTIONS, SnackbarConfig } from './snackbar-config.model';
import { SnackbarDuration } from './snackbar-duration';
import { SnackbarRef } from './snackbar-ref.model';
import { SnackbarQueueService } from './snackbar-queue.service';

const _defaultConfig: SnackbarConfig = {
  duration: SnackbarDuration.long,
  dismissOnAction: true,
  dismissWhenOpenAnotherSnackbar: true
};

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private readonly _snackbarComponent: ComponentFactory<SnackbarComponent>;
  private readonly _defaultConfig: SnackbarConfig;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private readonly _appRef: ApplicationRef,
              private _injector: Injector,
              private _snackbarQueueService: SnackbarQueueService,
              @Optional() @Inject(SNACKBAR_DEFAULT_OPTIONS) userOptions: SnackbarConfig) {

    this._snackbarComponent = _componentFactoryResolver.resolveComponentFactory(SnackbarComponent);
    this._defaultConfig = { ..._defaultConfig, ... userOptions };
  }

  open(message: string, config?: SnackbarConfig): SnackbarRef {

    const snackbarComponentRef = this._snackbarComponent.create(this._injector);

    this._appRef.attachView(snackbarComponentRef.hostView);

    snackbarComponentRef.instance.message = message;
    snackbarComponentRef.instance._config = { ...this._defaultConfig, ...config };

    this._snackbarQueueService.add(snackbarComponentRef);

    return snackbarComponentRef.instance;
  }
}
