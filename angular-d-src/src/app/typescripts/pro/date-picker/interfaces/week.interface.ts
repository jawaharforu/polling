import { IMyCalendarDay } from './calendarDay.interface';

export interface IMyWeek {
  week: Array<IMyCalendarDay>;
  weekNbr: number;
}
