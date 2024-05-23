import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getStartAndEndOfPreviousWeek(date: Date): { startOfWeek: Date, endOfWeek: Date } {
    const dayOfWeek = date.getDay();
    const startOfCurrentWeek = new Date(date);

    startOfCurrentWeek.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
    
    const startOfPreviousWeek = new Date(startOfCurrentWeek);
    startOfPreviousWeek.setDate(startOfCurrentWeek.getDate() - 7);

    const endOfPreviousWeek = new Date(startOfPreviousWeek);
    endOfPreviousWeek.setDate(startOfPreviousWeek.getDate() + 6);

    return { startOfWeek: startOfPreviousWeek, endOfWeek: endOfPreviousWeek };
  }
}
