import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private selectedDate = new BehaviorSubject<string>(new Date().toISOString());
  selectedDate$ = this.selectedDate.asObservable();

  // Seçilen tarihi günceller
  setSelectedDate(date: string) {
    this.selectedDate.next(date);
  }

  getSelectedDate(): string {
    return this.selectedDate.value;
  }
}
