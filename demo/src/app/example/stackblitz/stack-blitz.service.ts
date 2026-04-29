import { Injectable } from '@angular/core';
import { Project } from './project.model';

import StackBlitzSDK from '@stackblitz/sdk';

import indexTemplate from './index.html';
// @ts-ignore
import appModuleTsTemplate from './app/app.module.ts' with { loader: 'text' };
// @ts-ignore
import appComponentTsTemplate from './app/app.component.ts' with { loader: 'text' };
// @ts-ignore
import mainTemplate from './main.ts' with { loader: 'text' };
import angularJsonTemplate from './angular.json';

import { replaceAll } from '../replace-all';

@Injectable({
  providedIn: 'root'
})
export class StackBlitzService {

  createProject(project: Project) {
    const files: {[path: string]: string} = {
      'angular.json': JSON.stringify(angularJsonTemplate),
      'src/main.ts': mainTemplate,
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
        '@universal-material/core': '2.0.0-alpha.20',
        '@universal-material/angular': '2.0.1-alpha.47'
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
