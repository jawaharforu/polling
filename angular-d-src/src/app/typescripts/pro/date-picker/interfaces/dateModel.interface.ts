import { IMyDate } from './date.interface';

export interface IMyDateModel {
  date: IMyDate;
  jsdate: Date;
  formatted: string;
  epoc: number;
}
