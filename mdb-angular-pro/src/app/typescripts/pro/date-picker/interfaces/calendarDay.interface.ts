import { IMyDate } from './date.interface';
import { IMyMarkedDate } from './markedDate.interface';

export interface IMyCalendarDay {
  dateObj: IMyDate;
  cmo: number;
  currDay: boolean;
  dayNbr: number;
  disabled: boolean;
  markedDate: IMyMarkedDate;
}
