import { Injectable } from '@angular/core';
import { IMyLocales, IMyOptions } from '../interfaces/index';

@Injectable()
export class LocaleService {
  private locales: IMyLocales = {
    'en': {
      dayLabelsFull: {
        su: 'Sunday',
        mo: 'Monday',
        tu: 'Tuesday',
        we: 'Wednesday',
        th: 'Thursday',
        fr: 'Friday',
        sa: 'Saturday'
      },
      dayLabels: {
        su: 'Sun',
        mo: 'Mon',
        tu: 'Tue',
        we: 'Wed',
        th: 'Thu',
        fr: 'Fri',
        sa: 'Sat'
      },
      monthLabelsFull: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
      },
      monthLabels: {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
      },
      dateFormat: 'yyyy-mm-dd',
      todayBtnTxt: 'Today',
      clearBtnTxt: 'Clear',
      closeBtnTxt: 'Close',
      firstDayOfWeek: 'mo',
      sunHighlight: true,
    }
  };

  getLocaleOptions(locale: string): IMyOptions {
    if (locale && this.locales.hasOwnProperty(locale)) {
      // User given locale
      return this.locales[locale];
    }
    // Default: en
    return this.locales['en'];
  }
}
