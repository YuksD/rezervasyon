import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private selectedDateSubject = new BehaviorSubject<string>(new Date().toISOString());
  selectedDate$ = this.selectedDateSubject.asObservable();

  // Seçilen tarihi günceller
  setSelectedDate(date: string) {
    this.selectedDateSubject.next(date);
  }
}
