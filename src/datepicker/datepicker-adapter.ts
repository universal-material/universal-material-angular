export abstract class DatepickerAdapter {
  abstract formatDate(date: Date): string;
  abstract getMonthName(date: Date): string;
  abstract getMonthWithYear(date: Date): string;
  abstract getYear(date: Date): string;
  abstract getWeekDaysNames(firstDayOfWeek: number): string[];
}
