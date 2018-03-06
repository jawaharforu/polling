/**
 * returns coumputed style of given element
 * @param el
 * @param styleProp
 * @returns {any}
 */
// export function computedStyle(element: string | HTMLElement, styleProp: string): string {
  export function computedStyle(element: string | HTMLElement, styleProp: string): string | any {
  let el: any;
  el =  (typeof element === 'string') ? (<HTMLElement>document.querySelector(<string>element)) : element;

  let value: any;
  const defaultView: any = (el.ownerDocument || document).defaultView;

  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, '-$1').toLowerCase();
    return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el['currentStyle']) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/\-(\w)/g, function( letter) {
      return letter.toUpperCase();
    });
    value = el['currentStyle'][styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
      return (function(val: any) {
        const oldLeft = el.style.left, oldRsLeft = el['runtimeStyle'].left;
        el['runtimeStyle'].left = el['currentStyle'].left;
        el.style.left = val || 0;
        val = el.style['pixelLeft'] + 'px';
        el.style.left = oldLeft;
        el['runtimeStyle'].left = oldRsLeft;
        return val;
      })(value);
    }
    return value;
  }
}
