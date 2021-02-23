import { Injectable } from '@angular/core';
import { Project } from './project.model';

import StackBlitzSDK from '@stackblitz/sdk';

// @ts-ignore
import indexTemplate from '!raw-loader!./index.html';
// @ts-ignore
import appModuleTsTemplate from '!raw-loader!./app/app.module.ts';
// @ts-ignore
import appComponentTsTemplate from '!raw-loader!./app/app.component.ts';
// @ts-ignore
import mainTemplate from '!raw-loader!./main.ts';
import angularJsonTemplate from './angular.json';
// @ts-ignore
import polyfillsTemplate from '!raw-loader!./polyfills.ts';
import { replaceAll } from '../replace-all';

@Injectable({
  providedIn: 'root'
})
export class StackBlitzService {

  createProject(project: Project) {
    const files: {[path: string]: string} = {
      'angular.json': JSON.stringify(angularJsonTemplate),
      'src/main.ts': mainTemplate,
      'src/styles.scss': ' ',
      'src/polyfills.ts': polyfillsTemplate,
      'src/index.html': indexTemplate,
      'src/app/app.component.html': `<div class="u-container">
  <app-$example-component-name></app-$example-component-name>
</div>
`,
      'src/app/app.component.ts': appComponentTsTemplate,
      'src/app/app.module.ts': appModuleTsTemplate
    };

    const pascalCaseProjectName = this.getPascalCaseProjectName(project.name);

    for (const key of Object.keys(files)) {
      let content = files[key];
      content = replaceAll(content, `$example-component-name`, project.name);
      content = replaceAll(content, `$ExampleComponentName`, pascalCaseProjectName);

      files[key] = content;
    }

    files[`src/app/${project.name}.component.ts`] = project.tsCode;
    files[`src/app/${project.name}.component.scss`] = project.cssCode;
    files[`src/app/${project.name}.component.html`] = project.htmlCode;

    StackBlitzSDK.openProject({
      title: 'Example',
      description: 'Universal material example',
      template: 'angular-cli',
      files: files,
      dependencies: {
        '@universal-material/core': '*',
        '@universal-material/angular': '*',
        'core-js': '2'
      }
    });
  }

  getPascalCaseProjectName(projectName: string) {
    const segments = projectName.split('-');

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      segments[i] = segment[0].toUpperCase() + segment.substring(1);
    }

    return segments.join('');
  }
}
