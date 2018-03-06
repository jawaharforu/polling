/**
 * Created by sebastianfuss on 02.09.16.
 */

export class PageScrollUtilService {

  /**
   * Util method to check whether a given variable is either undefined or null
   * @param variable
   * @returns {boolean} true the variable is undefined or null
   */
  public static isUndefinedOrNull(variable: any): boolean {
    return (typeof variable === 'undefined') || variable === undefined || variable === null;
  }

  public static extractElementPosition(document: Document, scrollTargetElement: HTMLElement): {top: number, left: number} {

    const body = document.body;
    const docEl = document.documentElement;

    // const windowPageYOffset: number = document.defaultView && document.defaultView.pageYOffset || undefined;
    const windowPageYOffset: number | any = document.defaultView && document.defaultView.pageYOffset as any || undefined;
    // const windowPageXOffset: number = document.defaultView && document.defaultView.pageXOffset || undefined;
    const windowPageXOffset: number | any = document.defaultView && document.defaultView.pageXOffset as any || undefined;

    const scrollTop = windowPageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = windowPageXOffset || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;


    if (PageScrollUtilService.isUndefinedOrNull(scrollTargetElement)) {
      // No element found, so return the current position to not cause any change in scroll position
      return {top: scrollTop, left: scrollLeft};
    }
    const box = scrollTargetElement.getBoundingClientRect();

    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
  }
}
