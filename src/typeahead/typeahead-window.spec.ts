import {TestBed, ComponentFixture} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component, ViewChild} from '@angular/core';

import {TypeaheadWindow} from './typeahead-window';
import {expectResults, getWindowLinks} from '../test/typeahead/common';
import {TypeaheadModule} from './typeahead.module';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

describe('u-typeahead-window', () => {

  beforeEach(() => {
    TestBed.overrideModule(TypeaheadModule, {set: {exports: [TypeaheadWindow]}});
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [TypeaheadModule]});
  });

  describe('display', () => {

    it('should display results with the first row active', () => {
      const fixture =
          createTestComponent('<u-typeahead-window [results]="results" [term]="term"></u-typeahead-window>');

      expectResults(fixture.nativeElement, ['+bar', 'baz']);
    });

    it('should use a formatting function to display results', () => {
      const fixture = createTestComponent(
          '<u-typeahead-window [results]="results" [term]="term" [formatter]="formatterFn"></u-typeahead-window>');

      expectResults(fixture.nativeElement, ['+BAR', 'BAZ']);
    });

    it('should use a custom template if provided', () => {
      const fixture = createTestComponent(`
           <ng-template #rt let-r="result" let-t="term">{{r.toUpperCase()}}-{{t}}</ng-template>
           <u-typeahead-window [results]="results" [term]="term" [resultTemplate]="rt"></u-typeahead-window>`);

      expectResults(fixture.nativeElement, ['+BAR-ba', 'BAZ-ba']);
    });
  });

  describe('active row', () => {

    it('should change active row on prev / next method call', () => {
      const html = `
           <button (click)="w.next()">+</button>
           <button (click)="w.prev()">-</button>
           <u-typeahead-window [results]="results" [term]="term" #w="TypeaheadWindow"></u-typeahead-window>`;
      const fixture = createTestComponent(html);
      const buttons = fixture.nativeElement.querySelectorAll('button');

      expectResults(fixture.nativeElement, ['+bar', 'baz']);

      buttons[0].click();
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['bar', '+baz']);

      buttons[1].click();
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['+bar', 'baz']);
    });

    it('should wrap active row on prev / next method call', () => {
      const html = `
           <button (click)="w.next()">+</button>
           <button (click)="w.prev()">-</button>
           <u-typeahead-window [results]="results" [term]="term" #w="TypeaheadWindow"></u-typeahead-window>`;
      const fixture = createTestComponent(html);
      const buttons = fixture.nativeElement.querySelectorAll('button');

      expectResults(fixture.nativeElement, ['+bar', 'baz']);

      buttons[1].click();
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['bar', '+baz']);

      buttons[0].click();
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['+bar', 'baz']);
    });

    it('should wrap active row on prev / next method call for [focusFirst]="false"', () => {
      const html = `
           <button (click)="w.next()">+</button>
           <button (click)="w.prev()">-</button>
           <u-typeahead-window [results]="results" [term]="term" #w="TypeaheadWindow" [focusFirst]="false"></u-typeahead-window>`;
      const fixture = createTestComponent(html);
      const buttons = fixture.nativeElement.querySelectorAll('button');

      expectResults(fixture.nativeElement, ['bar', 'baz']);

      buttons[0].click();  // next
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['+bar', 'baz']);

      buttons[0].click();  // next
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['bar', '+baz']);

      buttons[0].click();  // next
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['bar', 'baz']);

      buttons[1].click();  // prev
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['bar', '+baz']);

      buttons[1].click();  // prev
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['+bar', 'baz']);

      buttons[1].click();  // prev
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['bar', 'baz']);
    });

    it('should change active row on mouseenter', () => {
      const fixture =
          createTestComponent(`<u-typeahead-window [results]="results" [term]="term"></u-typeahead-window>`);
      const links = getWindowLinks(fixture.debugElement);

      expectResults(fixture.nativeElement, ['+bar', 'baz']);

      links[1].triggerEventHandler('mouseenter', {});
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['bar', '+baz']);
    });
  });

  describe('result selection', () => {
    it('should select a given row on click', () => {
      const fixture = createTestComponent(
          '<u-typeahead-window [results]="results" [term]="term" (select)="selected = $event"></u-typeahead-window>');
      const links = getWindowLinks(fixture.debugElement);

      expectResults(fixture.nativeElement, ['+bar', 'baz']);

      links[1].triggerEventHandler('click', {});
      fixture.detectChanges();
      expect(fixture.componentInstance.selected).toBe('baz');
    });

    it('should return selected row via getActive()', () => {
      const html = `
           <button (click)="active = w.getActive()">getActive</button>
           <button (click)="w.next()">+</button>
           <u-typeahead-window [results]="results" [term]="term" #w="TypeaheadWindow"></u-typeahead-window>`;
      const fixture = createTestComponent(html);

      const buttons = fixture.nativeElement.querySelectorAll('button');
      const activeBtn = buttons[0];
      const nextBtn = buttons[1];

      activeBtn.click();
      expectResults(fixture.nativeElement, ['+bar', 'baz']);
      expect(fixture.componentInstance.active).toBe('bar');

      nextBtn.click();
      activeBtn.click();
      fixture.detectChanges();
      expectResults(fixture.nativeElement, ['bar', '+baz']);
      expect(fixture.componentInstance.active).toBe('baz');
    });

    it('should have buttons of type button', () => {
      const html = `
           <u-typeahead-window [results]="results" [term]="term"></u-typeahead-window>`;
      const fixture = createTestComponent(html);
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i].getAttribute('type')).toBe('button');
      }
    });
  });

  describe('accessibility', () => {

    function getWindow(element): HTMLDivElement {
      return <HTMLDivElement>element.querySelector('u-typeahead-window.dropdown-menu');
    }

    it('should add correct ARIA attributes', () => {
      const fixture = createTestComponent(
          '<u-typeahead-window id="test-typeahead" [results]="results" [term]="term"></u-typeahead-window>');
      const compiled = fixture.nativeElement.querySelector('u-typeahead-window.dropdown-menu');

      expect(compiled.getAttribute('role')).toBe('listbox');
      expect(compiled.getAttribute('id')).toBe('test-typeahead');

      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
      for (let i = 0; i < buttons.length; i++) {
        expect(buttons[i].getAttribute('id')).toBe('test-typeahead-' + i);
        expect(buttons[i].getAttribute('role')).toBe('option');
      }
    });

  });

});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  active: string;
  results = ['bar', 'baz'];
  term = 'ba';
  selected: string;

  @ViewChild(TypeaheadWindow) popup: TypeaheadWindow;

  formatterFn = (result) => { return result.toUpperCase(); };
}
