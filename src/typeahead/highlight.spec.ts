import {TestBed, ComponentFixture} from '@angular/core/testing';
import {createGenericTestComponent} from '../test/common';

import {Component} from '@angular/core';

import {Highlight} from './highlight';
import {TypeaheadModule} from './typeahead.module';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

/**
 * Get generated innerHtml without HTML comments and Angular debug attributes
 */
function highlightHtml(fixture) {
  const elms = fixture.nativeElement.children[0].childNodes;
  let elm;
  let result = '';
  let nodeName;

  for (let i = 0; i < elms.length; i++) {
    elm = elms[i];

    if (elm.nodeType === Node.ELEMENT_NODE) {
      nodeName = elm.nodeName.toLowerCase();
      result += `<${nodeName} class="${elm.className}">${elm.textContent}</${nodeName}>`;
    } else if (elm.nodeType === Node.TEXT_NODE) {
      result += elm.wholeText;
    }
  }

  return result;
}

describe('u-highlight', () => {

  beforeEach(() => {
    TestBed.overrideModule(TypeaheadModule, {set: {exports: [Highlight]}});
    TestBed.configureTestingModule({declarations: [TestComponent], imports: [TypeaheadModule]});
  });

  it('should render highlighted text when there is one match', () => {
    const fixture = createTestComponent('<u-highlight result="foo bar baz" term="bar"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="u-highlight">bar</span> baz');
  });

  it('should render highlighted text when there are multiple matches', () => {
    const fixture = createTestComponent('<u-highlight result="foo bar baz bar foo" term="bar"></u-highlight>');

    expect(highlightHtml(fixture))
        .toBe('foo <span class="u-highlight">bar</span> baz <span class="u-highlight">bar</span> foo');
  });

  it('should render highlighted text when there is a match at the beginning', () => {
    const fixture = createTestComponent('<u-highlight result="bar baz" term="bar"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('<span class="u-highlight">bar</span> baz');
  });

  it('should render highlighted text when there is a match at the end', () => {
    const fixture = createTestComponent('<u-highlight result="bar baz" term="baz"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('bar <span class="u-highlight">baz</span>');
  });

  it('should render highlighted text when there is a case-insensitive match', () => {
    const fixture = createTestComponent('<u-highlight result="foo bAR baz" term="bar"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="u-highlight">bAR</span> baz');
  });

  it('should render highlighted text with special characters', () => {
    const fixture = createTestComponent('<u-highlight result="foo (bAR baz" term="(BAR"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('foo <span class="u-highlight">(bAR</span> baz');
  });

  it('should render highlighted text for stringified non-string args', () => {
    const fixture = createTestComponent('<u-highlight [result]="123" term="2"></u-highlight>');
    fixture.detectChanges();
    expect(highlightHtml(fixture)).toBe('1<span class="u-highlight">2</span>3');
  });

  it('should behave reasonably for blank result', () => {
    const fixture = createTestComponent('<u-highlight [result]="null" term="2"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('');
  });

  it('should not convert null result to string', () => {
    const fixture = createTestComponent('<u-highlight [result]="null" term="null"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('');
  });

  it('should properly detect matches in 0 result', () => {
    const fixture = createTestComponent('<u-highlight [result]="0" term="0"></u-highlight>');

    expect(highlightHtml(fixture)).toBe(`<span class="u-highlight">0</span>`);
  });

  it('should not highlight anything for blank term', () => {
    const fixture = createTestComponent('<u-highlight result="1null23" [term]="null"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('1null23');
  });

  it('should not highlight anything for blank term', () => {
    const fixture = createTestComponent(`<u-highlight result="123" [term]="''"></u-highlight>`);

    expect(highlightHtml(fixture)).toBe('123');
  });

  it('should properly highlight zeros', () => {
    const fixture = createTestComponent(`<u-highlight result="0123" [term]="0"></u-highlight>`);

    expect(highlightHtml(fixture)).toBe('<span class="u-highlight">0</span>123');
  });

  it('should support custom highlight class', () => {
    const fixture = createTestComponent('<u-highlight result="123" [term]="2" highlightClass="my"></u-highlight>');

    expect(highlightHtml(fixture)).toBe('1<span class="my">2</span>3');
  });
});


@Component({selector: 'test-cmp', template: ''})
class TestComponent {
}
