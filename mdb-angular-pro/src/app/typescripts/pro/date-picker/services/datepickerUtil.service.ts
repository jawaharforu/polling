import { Injectable } from '@angular/core';
import { IMyDate } from '../interfaces/date.interface';
import { IMyDateRange } from '../interfaces/dateRange.interface';
import { IMyMonth } from '../interfaces/month.interface';
import { IMyMonthLabels } from '../interfaces/monthLabels.interface';
import { IMyMarkedDates } from '../interfaces/markedDates.interface';
import { IMyMarkedDate } from '../interfaces/markedDate.interface';

@Injectable()
export class UtilService {
  isDateValid(dateStr: string,
    dateFormat: string,
    minYear: number,
    maxYear: number,
    disableUntil: IMyDate,
    disableSince: IMyDate,
    disableWeekends: boolean,
    disableDays: Array<IMyDate>,
    disableDateRanges: Array<IMyDateRange>,
    monthLabels: IMyMonthLabels,
    enableDays: Array<IMyDate>
    ): IMyDate {
    const returnDate: IMyDate = {day: 0, month: 0, year: 0};
    const daysInMonth: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isMonthStr: boolean = this.getDatePartIndex(dateFormat, 'mmm') !== -1;

    if (dateStr.length !== dateFormat.length) {
      return returnDate;
    }

    const separator: string = this.getDateFormatSeparator(dateFormat);

    const parts: Array<string> = dateStr.split(separator);
    if (parts.length !== 3) {
      return returnDate;
    }

    const day: number = this.parseDatePartNumber(dateFormat, dateStr, 'dd');
    const month: number = isMonthStr ?
    this.parseDatePartMonthName(dateFormat, dateStr, 'mmm', monthLabels) :
    this.parseDatePartNumber(dateFormat, dateStr, 'mm');
    const year: number = this.parseDatePartNumber(dateFormat, dateStr, 'yyyy');

    if (day !== -1 && month !== -1 && year !== -1) {
      if (year < minYear || year > maxYear || month < 1 || month > 12) {
        return returnDate;
      }

      const date: IMyDate = {year: year, month: month, day: day};

      if (this.isDisabledDay(date, disableUntil, disableSince, disableWeekends, disableDays, disableDateRanges, enableDays)) {
        return returnDate;
      }

      if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        daysInMonth[1] = 29;
      }

      if (day < 1 || day > daysInMonth[month - 1]) {
        return returnDate;
      }

      // Valid date
      return date;
    }
    return returnDate;
  }

  getDateFormatSeparator(dateFormat: string): string {
    return dateFormat.replace(/[dmy]/g, '')[0];
  }

  isMonthLabelValid(monthLabel: string, monthLabels: IMyMonthLabels): number {
    for (let key = 1; key <= 12; key++) {
      if (monthLabel.toLowerCase() === monthLabels[key].toLowerCase()) {
        return key;
      }
    }
    return -1;
  }

  isYearLabelValid(yearLabel: number, minYear: number, maxYear: number): number {
    if (yearLabel >= minYear && yearLabel <= maxYear) {
      return yearLabel;
    }
    return -1;
  }

  parseDatePartNumber(dateFormat: string, dateString: string, datePart: string): number {
    const pos: number = this.getDatePartIndex(dateFormat, datePart);
    if (pos !== -1) {
      const value: string = dateString.substring(pos, pos + datePart.length);
      if (!/^\d+$/.test(value)) {
        return -1;
      }
      return parseInt(value, 0);
    }
    return -1;
  }

  parseDatePartMonthName(dateFormat: string, dateString: string, datePart: string, monthLabels: IMyMonthLabels): number {
    const pos: number = this.getDatePartIndex(dateFormat, datePart);
    if (pos !== -1) {
      return this.isMonthLabelValid(dateString.substring(pos, pos + datePart.length), monthLabels);
    }
    return -1;
  }

  getDatePartIndex(dateFormat: string, datePart: string): number {
    return dateFormat.indexOf(datePart);
  }

  // parseDefaultMonth(monthString: string): IMyMonth {
    parseDefaultMonth(monthString: string | any): IMyMonth {
    const month: IMyMonth = {monthTxt: '', monthNbr: 0, year: 0};
    if (monthString !== '') {
      const split = monthString.split(monthString.match(/[^0-9]/)[0]);
      month.monthNbr = split[0].length === 2 ? parseInt(split[0], 0) : parseInt(split[1], 0);
      month.year = split[0].length === 2 ? parseInt(split[1], 0) : parseInt(split[0], 0);
    }
    return month;
  }

  isDisabledDay(  date: IMyDate,
    disableUntil: IMyDate,
    disableSince: IMyDate,
    disableWeekends: boolean,
    disableDays: Array<IMyDate>,
    disableDateRanges: Array<IMyDateRange>,
    enableDays: Array<IMyDate>
    ): boolean {
    for (const e of enableDays) {
      if (e.year === date.year && e.month === date.month && e.day === date.day) {
        return false;
      }
    }

    const dateMs: number = this.getTimeInMilliseconds(date);
    if (this.isInitializedDate(disableUntil) && dateMs <= this.getTimeInMilliseconds(disableUntil)) {
      return true;
    }

    if (this.isInitializedDate(disableSince) && dateMs >= this.getTimeInMilliseconds(disableSince)) {
      return true;
    }

    if (disableWeekends) {
      const dn = this.getDayNumber(date);
      if (dn === 0 || dn === 6) {
        return true;
      }
    }

    for (const d of disableDays) {
      if (d.year === date.year && d.month === date.month && d.day === date.day) {
        return true;
      }
    }

    for (const d of disableDateRanges) {
      if (this.isInitializedDate(d.begin) &&
        this.isInitializedDate(d.end) &&
        dateMs >= this.getTimeInMilliseconds(d.begin) &&
        dateMs <= this.getTimeInMilliseconds(d.end)
        )  {
        return true;
      }
    }
    return false;
  }

  isMarkedDate(date: IMyDate, markedDates: Array<IMyMarkedDates>, markWeekends: IMyMarkedDate): IMyMarkedDate {
    for (const md of markedDates) {
      for (const d of md.dates) {
        if (d.year === date.year && d.month === date.month && d.day === date.day) {
          return {marked: true, color: md.color};
        }
      }
    }
    if (markWeekends && markWeekends.marked) {
      const dayNbr = this.getDayNumber(date);
      if (dayNbr === 0 || dayNbr === 6) {
        return {marked: true, color: markWeekends.color};
      }
    }
    return {marked: false, color: ''};
  }

  getWeekNumber(date: IMyDate): number {
    const d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
    d.setDate(d.getDate() + (d.getDay() === 0 ? -3 : 4 - d.getDay()));
    return Math.round(((d.getTime() - new Date(d.getFullYear(), 0, 4).getTime()) / 86400000) / 7) + 1;
  }

  isMonthDisabledByDisableUntil(date: IMyDate, disableUntil: IMyDate): boolean {
    return this.isInitializedDate(disableUntil) && this.getTimeInMilliseconds(date) <= this.getTimeInMilliseconds(disableUntil);
  }

  isMonthDisabledByDisableSince(date: IMyDate, disableSince: IMyDate): boolean {
    return this.isInitializedDate(disableSince) && this.getTimeInMilliseconds(date) >= this.getTimeInMilliseconds(disableSince);
  }

  isInitializedDate(date: IMyDate): boolean {
    return date.year !== 0 && date.month !== 0 && date.day !== 0;
  }

  getTimeInMilliseconds(date: IMyDate): number {
    return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
  }

  getDayNumber(date: IMyDate): number {
    const d: Date = new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0);
    return d.getDay();
  }
}
