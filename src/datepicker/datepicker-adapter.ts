export abstract class DatepickerAdapter {
  abstract formatDate(date: Date | null): string;
  abstract getMonthName(date: Date | null): string;
  abstract getMonthWithYear(date: Date | null): string;
  abstract getYear(date: Date | null): string;
  abstract getWeekDaysNames(firstDayOfWeek: number): string[];
}
