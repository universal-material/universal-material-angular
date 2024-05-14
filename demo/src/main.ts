import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import '@universal-material/web';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
