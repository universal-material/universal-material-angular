import { ElementRef } from '@angular/core';

export function CustomElementAttribute(): any {
  return (_: any, propertyKey: string | symbol, __: PropertyDescriptor) => {
    return {
      set(newValue: any) {
        // @ts-ignore
        const component = <{ elementRef: ElementRef<any> }>this;

        if (newValue === false) {
          component.elementRef.nativeElement.removeAttribute(propertyKey);
          return this;
        }

        if (newValue === true) {
          component.elementRef.nativeElement.setAttribute(propertyKey, propertyKey);
          return this;
        }

        if (newValue === undefined || newValue === null) {
          component.elementRef.nativeElement.removeAttribute(propertyKey);
          return this;
        }

        component.elementRef.nativeElement.setAttribute(propertyKey, newValue);
        return this;
      }
    }
  }
}
