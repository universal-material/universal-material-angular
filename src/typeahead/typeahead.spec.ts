import {TestBed, ComponentFixture, async, fakeAsync, inject, tick} from '@angular/core/testing';
import {createGenericTestComponent, isBrowser} from '../test/common';
import {expectResults, getWindowLinks} from '../test/typeahead/common';

import {Component, DebugElement, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {Validators, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {Observable, Subject, merge} from 'rxjs';

import {Typeahead} from './typeahead';
import {TypeaheadModule} from './typeahead.module';
import {TypeaheadConfig} from './typeahead-config';
import {debounceTime, filter, map} from 'rxjs/operators';

import {ARIA_LIVE_DELAY} from '../util/accessibility/live';
import {Key} from '../util/key';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const createOnPushTestComponent = (html: string) =>
    createGenericTestComponent(html, TestOnPushComponent) as ComponentFixture<TestOnPushComponent>;

const createAsyncTestComponent = (html: string) =>
    createGenericTestComponent(html, TestAsyncComponent) as ComponentFixture<TestAsyncComponent>;

function createKeyDownEvent(key: number) {
  const event = {which: key, preventDefault: () => {}, stopPropagation: () => {}};
  spyOn(event, 'preventDefault');
  spyOn(event, 'stopPropagation');
  return event;
}

function getWindow(element): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('u-typeahead-window.dropdown-menu');
}

function getDebugInput(element: DebugElement): DebugElement {
  return element.query(By.directive(Typeahead));
}

function getNativeInput(element: HTMLElement): HTMLInputElement {
  return <HTMLInputElement>element.querySelector('input');
}

function changeInput(element: any, value: string) {
  const input = getNativeInput(element);
  input.value = value;
  const evt = document.createEvent('MouseEvent');
  evt.initEvent('input', true, true);
  input.dispatchEvent(evt);
}

function blurInput(element: any) {
  const input = getNativeInput(element);
  const evt = document.createEvent('HTMLEvents');
  evt.initEvent('blur', false, false);
  input.dispatchEvent(evt);
}

function expectInputValue(element: HTMLElement, value: string) {
  expect(getNativeInput(element).value).toBe(value);
}

function expectWindowResults(element, expectedResults: string[]) {
  const window = getWindow(element);
  expect(window).not.toBeNull();
  expectResults(window, expectedResults);
}

describe('u-typeahead', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TestOnPushComponent, TestAsyncComponent],
      imports: [TypeaheadModule, FormsModule, ReactiveFormsModule],
      providers: [{provide: ARIA_LIVE_DELAY, useValue: null}]
    });
  });

  describe('valueaccessor', () => {

    it('should format values when no formatter provided', async(() => {
         const fixture = createTestComponent('<input [(ngModel)]="model" [uTypeahead]="findNothing" />');

         const el = fixture.nativeElement;
         const comp = fixture.componentInstance;
         expectInputValue(el, '');

         comp.model = 'text';
         fixture.detectChanges();
         fixture.whenStable()
             .then(() => {
               expectInputValue(el, 'text');

               comp.model = null;
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               expectInputValue(el, '');

               comp.model = {};
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => { expectInputValue(el, '[object Object]'); });
       }));

    it('should format values with custom formatter provided', async(() => {
         const html =
             '<input [(ngModel)]="model" [uTypeahead]="findNothing" [inputFormatter]="uppercaseObjFormatter"/>';
         const fixture = createTestComponent(html);
         const el = fixture.nativeElement;
         const comp = fixture.componentInstance;
         expectInputValue(el, '');

         comp.model = null;
         fixture.detectChanges();
         fixture.whenStable()
             .then(() => {
               expectInputValue(el, '');

               comp.model = {value: 'text'};
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => { expectInputValue(el, 'TEXT'); });
       }));

    it('should use custom input formatter with falsy values', async(() => {
         const html = '<input [(ngModel)]="model" [uTypeahead]="findNothing" [inputFormatter]="uppercaseFormatter"/>';
         const fixture = createTestComponent(html);
         const el = fixture.nativeElement;
         const comp = fixture.componentInstance;
         expectInputValue(el, '');

         comp.model = null;
         fixture.detectChanges();
         fixture.whenStable()
             .then(() => {
               expectInputValue(el, '');

               comp.model = 0;
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => {
               expectInputValue(el, '0');

               comp.model = false;
               fixture.detectChanges();
               return fixture.whenStable();
             })
             .then(() => { expectInputValue(el, 'FALSE'); });
       }));
  });

  describe('window', () => {

    it('should be closed by default', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find"/>`);
      const compiled = fixture.nativeElement;
      expect(getWindow(compiled)).toBeNull();
    });

    it('should not be opened when the model changes', async(() => {
         const fixture = createTestComponent(`<input type="text" [(ngModel)]="model" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;

         fixture.componentInstance.model = 'one';
         fixture.detectChanges();
         fixture.whenStable().then(() => { expect(getWindow(compiled)).toBeNull(); });
       }));

    it('should be opened when there are results', async(() => {
         const fixture = createTestComponent(`<input type="text" [(ngModel)]="model" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;

         fixture.whenStable().then(() => {
           changeInput(compiled, 'one');
           fixture.detectChanges();
           expectWindowResults(compiled, ['+one', 'one more']);
           expect(fixture.componentInstance.model).toBe('one');
         });
       }));

    it('should be closed when there no results', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="findNothing"/>`);
      const compiled = fixture.nativeElement;

      expect(getWindow(compiled)).toBeNull();
    });

    it('should work when returning null as results', async(() => {
         const fixture = createTestComponent(`<input type="text" [uTypeahead]="findNull"/>`);
         const compiled = fixture.nativeElement;

         fixture.whenStable().then(() => {
           changeInput(compiled, 'one');
           fixture.detectChanges();
           expect(getWindow(compiled)).toBeNull();
         });
       }));

    it('should be closed on document click', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'one');
      fixture.detectChanges();
      expect(getWindow(compiled)).not.toBeNull();

      fixture.nativeElement.click();
      expect(getWindow(compiled)).toBeNull();
    });

    it('should not be closed on input click', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'one');
      fixture.detectChanges();
      expect(getWindow(compiled)).not.toBeNull();

      getNativeInput(compiled).click();
      expect(getWindow(compiled)).not.toBeNull();
    });

    it('should be closed when ESC is pressed', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'one');
      fixture.detectChanges();
      expect(getWindow(compiled)).not.toBeNull();

      const event = createKeyDownEvent(Key.Escape);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getWindow(compiled)).toBeNull();
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should select the result on click, close window and fill the input', async(() => {
         const fixture = createTestComponent(`<input type="text" [(ngModel)]="model" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;

         fixture.whenStable().then(() => {
           // clicking selected
           changeInput(compiled, 'o');
           fixture.detectChanges();
           expectWindowResults(compiled, ['+one', 'one more']);

           getWindowLinks(fixture.debugElement)[0].triggerEventHandler('click', {});
           fixture.detectChanges();
           expect(getWindow(compiled)).toBeNull();
           expectInputValue(compiled, 'one');
           expect(fixture.componentInstance.model).toBe('one');

           // clicking not selected
           changeInput(compiled, 'o');
           fixture.detectChanges();
           expectWindowResults(compiled, ['+one', 'one more']);
           expectInputValue(compiled, 'o');

           getWindowLinks(fixture.debugElement)[0].triggerEventHandler('click', {});
           fixture.detectChanges();
           expect(getWindow(compiled)).toBeNull();
           expectInputValue(compiled, 'one');
         });
       }));

    it('should select the result on ENTER, close window and fill the input', async(() => {
         const fixture = createTestComponent(`<input type="text" [(ngModel)]="model" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;

         fixture.whenStable().then(() => {
           changeInput(compiled, 'o');
           fixture.detectChanges();
           expectWindowResults(compiled, ['+one', 'one more']);

           const event = createKeyDownEvent(Key.Enter);
           getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
           fixture.detectChanges();
           expect(getWindow(compiled)).toBeNull();
           expectInputValue(compiled, 'one');
           expect(fixture.componentInstance.model).toBe('one');
           expect(event.preventDefault).toHaveBeenCalled();
           expect(event.stopPropagation).toHaveBeenCalled();
         });
       }));

    it('should select the result on TAB, close window and fill the input', () => {
      const fixture = createTestComponent(`<input type="text" [(ngModel)]="model" [uTypeahead]="find"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expect(getWindow(compiled)).not.toBeNull();

      const event = createKeyDownEvent(Key.Tab);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getWindow(compiled)).toBeNull();
      expectInputValue(compiled, 'one');
      expect(fixture.componentInstance.model).toBe('one');
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should make previous/next results active with up/down arrow keys', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expectWindowResults(compiled, ['+one', 'one more']);

      // down
      let event = createKeyDownEvent(Key.ArrowDown);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', '+one more']);
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.ArrowDown);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['+one', 'one more']);
      expect(event.preventDefault).toHaveBeenCalled();

      // up
      event = createKeyDownEvent(Key.ArrowUp);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', '+one more']);
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.ArrowUp);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['+one', 'one more']);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should use provided result formatter function', () => {
      const fixture =
          createTestComponent(`<input type="text" [uTypeahead]="find" [resultFormatter]="uppercaseFormatter"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expectWindowResults(compiled, ['+ONE', 'ONE MORE']);
    });

    it('should not mark first result as active when focusFirst is false', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find" [focusFirst]="false"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', 'one more']);
    });

    it('should reset active index when result changes', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expectWindowResults(compiled, ['+one', 'one more']);

      // move down to highlight the second item
      let event = createKeyDownEvent(Key.ArrowDown);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', '+one more']);
      expect(event.preventDefault).toHaveBeenCalled();

      // change search criteria to reset results while the popup stays open
      changeInput(compiled, 't');
      fixture.detectChanges();
      expectWindowResults(compiled, ['+two', 'three']);
    });


    it('should properly make previous/next results active with down arrow keys when focusFirst is false', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find" [focusFirst]="false"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', 'one more']);

      // down
      let event = createKeyDownEvent(Key.ArrowDown);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['+one', 'one more']);
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.ArrowDown);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', '+one more']);
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.ArrowDown);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', 'one more']);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should properly make previous/next results active with up arrow keys when focusFirst is false', () => {
      const fixture = createTestComponent(`<input type="text" [uTypeahead]="find" [focusFirst]="false"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', 'one more']);

      // up
      let event = createKeyDownEvent(Key.ArrowUp);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['one', '+one more']);
      expect(event.preventDefault).toHaveBeenCalled();

      event = createKeyDownEvent(Key.ArrowUp);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expectWindowResults(compiled, ['+one', 'one more']);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should not select the result on TAB, close window and not write to the input when focusFirst is false', () => {
      const fixture =
          createTestComponent(`<input type="text" [(ngModel)]="model" [uTypeahead]="find" [focusFirst]="false"/>`);
      const compiled = fixture.nativeElement;

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expect(getWindow(compiled)).not.toBeNull();

      const event = createKeyDownEvent(Key.Tab);
      getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
      fixture.detectChanges();
      expect(getWindow(compiled)).toBeNull();
      expectInputValue(compiled, 'o');
      expect(fixture.componentInstance.model).toBe('o');
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('should properly display results when an owning components using OnPush strategy', fakeAsync(() => {
         const fixture = createOnPushTestComponent(`<input type="text" [(ngModel)]="model" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;

         changeInput(compiled, 'o');
         fixture.detectChanges();
         tick(250);
         expectWindowResults(compiled, ['+one', 'one more']);
       }));
  });

  describe('with async typeahead function', () => {
    it('should not display results when input is "blured"', fakeAsync(() => {
         const fixture = createAsyncTestComponent(`<input type="text" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;

         changeInput(compiled, 'one');
         fixture.detectChanges();

         tick(50);

         blurInput(compiled);
         fixture.detectChanges();

         tick(250);
         expect(getWindow(compiled)).toBeNull();

         // Make sure that it is resubscribed again
         changeInput(compiled, 'two');
         fixture.detectChanges();
         tick(250);
         expect(getWindow(compiled)).not.toBeNull();
       }));

    it('should not display results when "Escape" is pressed', fakeAsync(() => {
         const fixture = createAsyncTestComponent(`<input type="text" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;

         // Change input first time
         changeInput(compiled, 'one');
         fixture.detectChanges();

         // Results for first input are loaded
         tick(250);
         expect(getWindow(compiled)).not.toBeNull();

         // Change input second time
         changeInput(compiled, 'two');
         fixture.detectChanges();
         tick(50);

         // Press Escape while second is still in progress
         const event = createKeyDownEvent(Key.Escape);
         getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
         fixture.detectChanges();

         // Results for second input are loaded (window shouldn't be opened in this case)
         tick(250);
         expect(getWindow(compiled)).toBeNull();

         // Make sure that it is resubscribed again
         changeInput(compiled, 'three');
         fixture.detectChanges();
         tick(250);
         expect(getWindow(compiled)).not.toBeNull();
       }));

    it('should not display results when value selected while new results are been loading', fakeAsync(() => {
         const fixture = createAsyncTestComponent(`<input type="text" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;

         // Change input first time
         changeInput(compiled, 'one');
         fixture.detectChanges();

         // Results for first input are loaded
         tick(250);
         expect(getWindow(compiled)).not.toBeNull();

         // Change input second time
         changeInput(compiled, 'two');
         fixture.detectChanges();
         tick(50);

         // Select a value from first results list while second is still in progress
         getWindowLinks(fixture.debugElement)[0].triggerEventHandler('click', {});
         fixture.detectChanges();
         expect(getWindow(compiled)).toBeNull();

         // Results for second input are loaded (window shouldn't be opened in this case)
         tick(250);
         expect(getWindow(compiled)).toBeNull();

         // Make sure that it is resubscribed again
         changeInput(compiled, 'three');
         fixture.detectChanges();
         tick(250);
         expect(getWindow(compiled)).not.toBeNull();
       }));
  });

  describe('objects', () => {

    it('should work with custom objects as values', async(() => {
         const fixture = createTestComponent(`
             <input type="text" [(ngModel)]="model" [uTypeahead]="findObjects"
                    [inputFormatter]="formatter" [resultFormatter]="uppercaseObjFormatter"/>`);
         const compiled = fixture.nativeElement;

         fixture.whenStable().then(() => {
           changeInput(compiled, 'o');
           fixture.detectChanges();
           expectWindowResults(compiled, ['+ONE', 'ONE MORE']);

           const event = createKeyDownEvent(Key.Enter);
           getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
           fixture.detectChanges();
           expect(getWindow(compiled)).toBeNull();
           expect(getNativeInput(compiled).value).toBe('1 one');
           expect(fixture.componentInstance.model).toEqual({id: 1, value: 'one'});
         });
       }));

    it('should allow to assign ngModel custom objects', async(() => {
         const fixture = createTestComponent(`
             <input type="text" [(ngModel)]="model" [uTypeahead]="findObjects"
                    [inputFormatter]="formatter" [resultFormatter]="uppercaseObjFormatter"/>`);
         const compiled = fixture.nativeElement;

         fixture.componentInstance.model = {id: 1, value: 'one'};
         fixture.detectChanges();
         fixture.whenStable().then(() => {
           expect(getWindow(compiled)).toBeNull();
           expect(getNativeInput(compiled).value).toBe('1 one');
         });
       }));
  });

  describe('forms', () => {

    it('should work with template-driven form validation', async(() => {
         const html = `
            <form>
              <input type="text" [(ngModel)]="model" name="control" required [uTypeahead]="findObjects" />
            </form>`;
         const fixture = createTestComponent(html);
         fixture.whenStable().then(() => {
           fixture.detectChanges();
           const compiled = fixture.nativeElement;
           expect(getNativeInput(compiled)).toHaveCssClass('ng-invalid');
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-valid');

           changeInput(compiled, 'o');
           fixture.detectChanges();
           expect(getNativeInput(compiled)).toHaveCssClass('ng-valid');
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-invalid');
         });
       }));

    it('should work with model-driven form validation', () => {
      const html = `
           <form [formGroup]="form">
             <input type="text" formControlName="control" required [uTypeahead]="findObjects" />
           </form>`;
      const fixture = createTestComponent(html);
      const compiled = fixture.nativeElement;

      expect(getNativeInput(compiled)).toHaveCssClass('ng-invalid');
      expect(getNativeInput(compiled)).not.toHaveCssClass('ng-valid');

      changeInput(compiled, 'o');
      fixture.detectChanges();
      expect(getNativeInput(compiled)).toHaveCssClass('ng-valid');
      expect(getNativeInput(compiled)).not.toHaveCssClass('ng-invalid');
    });

    it('should support disabled state', async(() => {
         const html = `
            <form>
              <input type="text" [(ngModel)]="model" name="control" [disabled]="true" [uTypeahead]="findObjects" />
            </form>`;
         const fixture = createTestComponent(html);
         fixture.whenStable().then(() => {
           fixture.detectChanges();
           const compiled = fixture.nativeElement;
           expect(getNativeInput(compiled).disabled).toBeTruthy();
         });
       }));

    it('should only propagate model changes on select when the editable option is on', async(() => {
         const html = `
            <form>
              <input type="text" [(ngModel)]="model" name="control" required [uTypeahead]="find" [editable]="false"/>
            </form>`;
         const fixture = createTestComponent(html);
         fixture.whenStable().then(() => {
           fixture.detectChanges();
           const compiled = fixture.nativeElement;
           expect(getNativeInput(compiled)).toHaveCssClass('ng-invalid');
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-valid');

           changeInput(compiled, 'o');
           fixture.detectChanges();
           expect(getNativeInput(compiled)).toHaveCssClass('ng-invalid');
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-valid');
           expect(fixture.componentInstance.model).toBeUndefined();

           const event = createKeyDownEvent(Key.Enter);
           getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
           fixture.detectChanges();
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-invalid');
           expect(getNativeInput(compiled)).toHaveCssClass('ng-valid');
           expect(fixture.componentInstance.model).toBe('one');
         });
       }));

    it('should clear model on user input when the editable option is on', async(() => {
         const html = `
            <form>
              <input type="text" [(ngModel)]="model" name="control" required [uTypeahead]="find" [editable]="false"/>
            </form>`;
         const fixture = createTestComponent(html);
         fixture.whenStable().then(() => {
           fixture.detectChanges();
           const compiled = fixture.nativeElement;
           expect(getNativeInput(compiled)).toHaveCssClass('ng-invalid');
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-valid');

           changeInput(compiled, 'o');
           fixture.detectChanges();
           expect(getNativeInput(compiled)).toHaveCssClass('ng-invalid');
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-valid');
           expect(fixture.componentInstance.model).toBeUndefined();

           const event = createKeyDownEvent(Key.Enter);
           getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
           fixture.detectChanges();
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-invalid');
           expect(getNativeInput(compiled)).toHaveCssClass('ng-valid');
           expect(fixture.componentInstance.model).toBe('one');

           changeInput(compiled, 'tw');
           fixture.detectChanges();
           expect(getNativeInput(compiled)).toHaveCssClass('ng-invalid');
           expect(getNativeInput(compiled)).not.toHaveCssClass('ng-valid');
           expect(fixture.componentInstance.model).toBeUndefined();
         });
       }));
  });

  describe('select event', () => {

    it('should raise select event when a result is selected', () => {
      const fixture = createTestComponent('<input [uTypeahead]="find" (selectItem)="onSelect($event.item)"/>');
      const input = getNativeInput(fixture.nativeElement);

      // clicking selected
      changeInput(fixture.nativeElement, 'o');
      fixture.detectChanges();
      getWindowLinks(fixture.debugElement)[0].triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(fixture.componentInstance.selectEventValue).toBe('one');
    });

    it('should not propagate model when preventDefault() is called on selectEvent', async(() => {
         const fixture = createTestComponent(
             '<input [(ngModel)]="model" [uTypeahead]="find" (selectItem)="$event.preventDefault()"/>');
         const input = getNativeInput(fixture.nativeElement);

         // clicking selected
         changeInput(fixture.nativeElement, 'o');
         fixture.detectChanges();
         getWindowLinks(fixture.debugElement)[0].triggerEventHandler('click', {});
         fixture.detectChanges();
         fixture.whenStable().then(() => { expect(fixture.componentInstance.model).toBe('o'); });
       }));
  });

  describe('container', () => {

    it('should be appended to the element matching the selector passed to "container"', () => {
      const selector = 'body';
      const fixture = createTestComponent(`<input [uTypeahead]="find" container="${selector}"/>`);

      changeInput(fixture.nativeElement, 'one');
      fixture.detectChanges();

      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(getWindow(document.querySelector(selector))).not.toBeNull();
    });

    it('should properly destroy typeahead window when the "container" option is used', () => {
      const selector = 'body';
      const fixture = createTestComponent(`<input *ngIf="show" [uTypeahead]="find" container="${selector}"/>`);

      changeInput(fixture.nativeElement, 'one');
      fixture.detectChanges();

      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(getWindow(document.querySelector(selector))).not.toBeNull();

      fixture.componentInstance.show = false;
      fixture.detectChanges();

      expect(getWindow(fixture.nativeElement)).toBeNull();
      expect(getWindow(document.querySelector(selector))).toBeNull();
    });
  });

  describe('auto attributes', () => {

    it('should have autocomplete, autocapitalize and autocorrect attributes set to off', () => {
      const fixture = createTestComponent('<input type="text" [uTypeahead]="findObjects" />');
      const input = getNativeInput(fixture.nativeElement);

      expect(input.getAttribute('autocomplete')).toBe('off');
      expect(input.getAttribute('autocapitalize')).toBe('off');
      expect(input.getAttribute('autocorrect')).toBe('off');
    });

    it('should have configurable autocomplete attribute', () => {
      const fixture =
          createTestComponent('<input type="text" [uTypeahead]="findObjects" autocomplete="ignored-123456"/>');
      const input = getNativeInput(fixture.nativeElement);

      expect(input.getAttribute('autocomplete')).toBe('ignored-123456');
    });
  });

  describe('accessibility', () => {

    it('should have correct role, aria-autocomplete, aria-expanded set by default', () => {
      const fixture = createTestComponent('<input type="text" [uTypeahead]="findObjects" />');
      const input = getNativeInput(fixture.nativeElement);

      fixture.detectChanges();

      expect(input.getAttribute('role')).toBe('combobox');
      expect(input.getAttribute('aria-multiline')).toBe('false');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
      expect(input.getAttribute('aria-expanded')).toBe('false');
      expect(input.getAttribute('aria-owns')).toBeNull();
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
      expect(input.getAttribute('aria-activedescendant')).toBeNull();
    });

    it('should correctly set aria-autocomplete depending on showHint', () => {
      const fixture = createTestComponent('<input type="text" [uTypeahead]="findObjects"  [showHint]="true" />');
      const input = getNativeInput(fixture.nativeElement);

      fixture.detectChanges();

      expect(input.getAttribute('aria-autocomplete')).toBe('both');
    });

    it('should have the correct ARIA attributes when interacting with input', async(() => {
         const fixture = createTestComponent(`<input type="text" [(ngModel)]="model" [uTypeahead]="find"/>`);
         const compiled = fixture.nativeElement;
         const input = getNativeInput(compiled);
         fixture.detectChanges();

         fixture.whenStable().then(() => {
           changeInput(compiled, 'o');
           fixture.detectChanges();
           expectWindowResults(compiled, ['+one', 'one more']);
           expect(input.getAttribute('aria-expanded')).toBe('true');
           expect(input.getAttribute('aria-owns')).toMatch(/u-typeahead-[0-9]+/);
           expect(input.getAttribute('aria-activedescendant')).toMatch(/u-typeahead-[0-9]+-0/);

           let event = createKeyDownEvent(Key.ArrowDown);
           getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
           fixture.detectChanges();
           expect(input.getAttribute('aria-activedescendant')).toMatch(/u-typeahead-[0-9]+-1/);

           event = createKeyDownEvent(Key.Enter);
           getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
           fixture.detectChanges();
           expect(input.getAttribute('aria-expanded')).toBe('false');
           expect(input.getAttribute('aria-owns')).toBeNull();
           expect(input.getAttribute('aria-activedescendant')).toBeNull();
         });
       }));
  });

  if (!isBrowser(['ie', 'edge'])) {
    describe('hint', () => {

      it('should show hint when an item starts with user input', async(() => {
           const fixture = createTestComponent(
               `<input type="text" [(ngModel)]="model" [uTypeahead]="findAnywhere" [showHint]="true"/>`);
           const compiled = fixture.nativeElement;
           const inputEl = getNativeInput(compiled);

           fixture.whenStable().then(() => {
             changeInput(compiled, 'on');
             fixture.detectChanges();
             expectWindowResults(compiled, ['+one', 'one more']);
             expect(inputEl.value).toBe('one');
             expect(inputEl.selectionStart).toBe(2);
             expect(inputEl.selectionEnd).toBe(3);

             const event = createKeyDownEvent(Key.ArrowDown);
             getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
             fixture.detectChanges();
             expect(inputEl.value).toBe('one more');
             expect(inputEl.selectionStart).toBe(2);
             expect(inputEl.selectionEnd).toBe(8);
           });
         }));

      it('should show hint with no selection when an item does not starts with user input', async(() => {
           const fixture = createTestComponent(
               `<input type="text" [(ngModel)]="model" [uTypeahead]="findAnywhere" [showHint]="true"/>`);
           const compiled = fixture.nativeElement;
           const inputEl = getNativeInput(compiled);

           fixture.whenStable().then(() => {
             changeInput(compiled, 'ne');
             fixture.detectChanges();
             expectWindowResults(compiled, ['+one', 'one more']);
             expect(inputEl.value).toBe('one');
             expect(inputEl.selectionStart).toBe(inputEl.selectionEnd);

             const event = createKeyDownEvent(Key.ArrowDown);
             getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
             fixture.detectChanges();
             expect(inputEl.value).toBe('one more');
             expect(inputEl.selectionStart).toBe(inputEl.selectionEnd);
           });
         }));

      it('should take input formatter into account when displaying hints', async(() => {
           const fixture = createTestComponent(`<input type="text" [(ngModel)]="model"
                [uTypeahead]="findAnywhere"
                [inputFormatter]="uppercaseFormatter"
                [showHint]="true"/>`);
           const compiled = fixture.nativeElement;
           const inputEl = getNativeInput(compiled);

           fixture.whenStable().then(() => {
             changeInput(compiled, 'on');
             fixture.detectChanges();
             expectWindowResults(compiled, ['+one', 'one more']);
             expect(inputEl.value).toBe('onE');
             expect(inputEl.selectionStart).toBe(2);
             expect(inputEl.selectionEnd).toBe(3);

             const event = createKeyDownEvent(Key.ArrowDown);
             getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
             fixture.detectChanges();
             expect(inputEl.value).toBe('onE MORE');
             expect(inputEl.selectionStart).toBe(2);
             expect(inputEl.selectionEnd).toBe(8);
           });
         }));

      it('should restore hint when results window is dismissed', async(() => {
           const fixture = createTestComponent(
               `<input type="text" [(ngModel)]="model" [uTypeahead]="findAnywhere" [showHint]="true"/>`);
           fixture.detectChanges();
           const compiled = fixture.nativeElement;
           const inputEl = getNativeInput(compiled);

           fixture.whenStable().then(() => {
             changeInput(compiled, 'on');
             fixture.detectChanges();
             expectWindowResults(compiled, ['+one', 'one more']);
             expect(inputEl.value).toBe('one');
             expect(inputEl.selectionStart).toBe(2);
             expect(inputEl.selectionEnd).toBe(3);

             const event = createKeyDownEvent(Key.Escape);
             getDebugInput(fixture.debugElement).triggerEventHandler('keydown', event);
             fixture.detectChanges();
             expect(inputEl.value).toBe('on');
             expect(inputEl.selectionStart).toBe(2);
             expect(inputEl.selectionEnd).toBe(2);
           });
         }));

      it('should not show hint when there is no result selected', async(() => {
           const fixture = createTestComponent(
               `<input type="text" [(ngModel)]="model" [uTypeahead]="find" [showHint]="true" [focusFirst]="false"/>`);
           fixture.detectChanges();
           const compiled = fixture.nativeElement;
           const inputEl = getNativeInput(compiled);

           fixture.whenStable().then(() => {
             changeInput(compiled, 'on');
             fixture.detectChanges();
             expectWindowResults(compiled, ['one', 'one more']);
             expect(inputEl.value).toBe('on');
           });
         }));
    });

    describe('Custom config', () => {
      beforeEach(() => {
        TestBed.overrideComponent(
            TestComponent, {set: {template: '<input type="text" [(ngModel)]="model" [uTypeahead]="findAnywhere"/>'}});
      });

      beforeEach(inject([TypeaheadConfig], (c: TypeaheadConfig) => { c.showHint = true; }));

      it('should initialize inputs with provided config', () => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const typeahead = fixture.componentInstance.typeahead;
        expect(typeahead.showHint).toBe(true);
      });
    });

    describe('Custom config as provider', () => {
      beforeEach(() => {
        const config = new TypeaheadConfig();
        config.showHint = true;
        TestBed.configureTestingModule({providers: [{provide: TypeaheadConfig, useValue: config}]});

        TestBed.overrideComponent(
            TestComponent, {set: {template: '<input type="text" [(ngModel)]="model" [uTypeahead]="findAnywhere"/>'}});
      });

      it('should initialize inputs with provided config as provider', () => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        const typeahead = fixture.componentInstance.typeahead;
        expect(typeahead.showHint).toBe(true);
      });
    });
  }
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  private _strings = ['one', 'one more', 'two', 'three'];
  private _objects =
      [{id: 1, value: 'one'}, {id: 10, value: 'one more'}, {id: 2, value: 'two'}, {id: 3, value: 'three'}];

  model: any;
  selectEventValue: any;
  show = true;

  form = new FormGroup({control: new FormControl('', Validators.required)});

  findOutput$: Observable<any[]>;

  @ViewChild(Typeahead) typeahead: Typeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  find =
      (text$: Observable<string>) => {
        const clicks$ = this.click$.pipe(filter(() => !this.typeahead.isPopupOpen()));
        this.findOutput$ =
            merge(text$, this.focus$, clicks$).pipe(map(text => this._strings.filter(v => v.startsWith(text))));
        return this.findOutput$;
      }

  findAnywhere =
      (text$: Observable<string>) => {
        return text$.pipe(map(text => this._strings.filter(v => v.indexOf(text) > -1)));
      }

  findNothing = (text$: Observable<string>) => { return text$.pipe(map(text => [])); };

  findNull = (text$: Observable<string>) => { return text$.pipe(map(text => null)); };

  findObjects =
      (text$: Observable<string>) => {
        return text$.pipe(map(text => this._objects.filter(v => v.value.startsWith(text))));
      }

  formatter = (obj: {id: number, value: string}) => { return `${obj.id} ${obj.value}`; };

  uppercaseFormatter = s => `${s}`.toUpperCase();

  uppercaseObjFormatter = (obj: {value: string}) => { return `${obj.value}`.toUpperCase(); };


  onSelect($event) { this.selectEventValue = $event; }
}

@Component({selector: 'test-onpush-cmp', changeDetection: ChangeDetectionStrategy.OnPush, template: ''})
class TestOnPushComponent {
  private _strings = ['one', 'one more', 'two', 'three'];

  find = (text$: Observable<string>) => {
    return text$.pipe(debounceTime(200), map(text => this._strings.filter(v => v.startsWith(text))));
  }
}

@Component({selector: 'test-async-cmp', template: ''})
class TestAsyncComponent {
  private _strings = ['one', 'one more', 'two', 'three'];

  find = (text$: Observable<string>) => {
    return text$.pipe(debounceTime(200), map(text => this._strings.filter(v => v.startsWith(text))));
  }
}
