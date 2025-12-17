import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routing';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideEnvironmentNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig  = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideEnvironmentNgxMask()
  ]
}
