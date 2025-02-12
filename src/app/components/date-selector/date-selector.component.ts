import { Component } from '@angular/core';
import { DateService } from 'src/app/services/date.service'; // Tarih yönetim servisi

@Component({
  selector: 'app-date-selector',
  template: `
    <ion-segment (ionChange)="onDateChange($event)">
      <ion-segment-button value="today" checked>
        <ion-label>Bugün</ion-label>
      </ion-segment-button>
      <ion-segment-button value="tomorrow">
        <ion-label>Yarın</ion-label>
      </ion-segment-button>
    </ion-segment>
  `
})
export class DateSelectorComponent {
  constructor(private dateService: DateService) {}

  onDateChange(event: any) {
    this.dateService.setSelectedDate(event.detail.value); // Seçilen tarihi servise aktar
  }
}
