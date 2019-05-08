export class AnimationEvents {
  private static readonly _animationEndEvents = ['webkitAnimationEnd', 'oanimationend', 'msAnimationEnd', 'animationend'];

  static attachAnimationEndEvents(element: Element, listener: EventListenerOrEventListenerObject) {
    AnimationEvents
      ._animationEndEvents
      .forEach(eventName => {
        element.addEventListener(eventName, listener);
      });
  }
}
