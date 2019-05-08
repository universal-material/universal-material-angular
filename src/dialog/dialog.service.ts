import { ApplicationRef, ComponentFactoryResolver, Injectable, InjectionToken, Injector, Type } from '@angular/core';

import { DialogInjector } from './dialog-injector';
import { DialogStackService } from './dialog-stack.service';

const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private readonly _componentFactoryResolver: ComponentFactoryResolver,
              private readonly _appRef: ApplicationRef,
              private readonly _injector: Injector,
              private readonly _dialogStackService: DialogStackService) {

  }

  _internalOpen<T>(dialogType: Type<T>, customInjectionTokens: WeakMap<any, any>): T {
    const dialogComponent = this._componentFactoryResolver.resolveComponentFactory(dialogType);

    const dialogComponentRef = dialogComponent.create(new DialogInjector(this._injector, customInjectionTokens));

    dialogComponentRef.instance.afterClose.subscribe(() => {
      this._appRef.detachView(dialogComponentRef.hostView);
      dialogComponentRef.destroy();
    });

    this._appRef.attachView(dialogComponentRef.hostView);

    this._dialogStackService.add(dialogComponentRef.instance);

    document
      .querySelector('body')
      .appendChild(dialogComponentRef.location.nativeElement);

    return dialogComponentRef.instance;
  }

  open<T>(dialogType: Type<T>, data?: any): T {
    return this._internalOpen(dialogType, new WeakMap(data && [DIALOG_DATA, data]));
  }
}
