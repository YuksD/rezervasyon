import { Component, OnDestroy, OnInit } from '@angular/core';
import { KortDataService } from 'src/app/services/kort-data.service';
import { DateService } from 'src/app/services/date.service';
import { Subscription } from 'rxjs';

// Öncelikle slot yapısını tanımlayın
interface Slot {
  kort: number;
  date: string;
  time: string;
  player: string;
}

@Component({
  selector: 'app-genel',
  templateUrl: './genel.page.html',
  styleUrls: ['./genel.page.scss'],
})
export class GenelPage implements OnInit, OnDestroy {
  timeSlots: { time: string; kort1: boolean; kort2: boolean; kort3: boolean; kort4: boolean }[] = [];
  selectedDate: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private kortDataService: KortDataService,
    private dateService: DateService
  ) {}

  ngOnInit() {
    // Seçilen tarihi takip et
    const dateSubscription = this.dateService.selectedDate$.subscribe(date => {
      this.selectedDate = date; // Tarihi string olarak al
      this.loadSlots(); // Seçilen tarihe göre verileri yükle
    });
    this.subscriptions.push(dateSubscription);
  }

  loadSlots() {
    this.kortDataService.getRezervasyonlar().subscribe((data: { rezervasyonlar: Slot[] }) => {
      const slots = data.rezervasyonlar; // 'rezervasyonlar' dizisini alın
      const actualDate = this.selectedDate.split('T')[0];
      const allSlots = this.generateTimeSlotsForDay(8, 22);
  
      const filteredSlots = allSlots.map(time => {
        const kort1 = slots.find((slot: Slot) => slot.kort === 1 && slot.time === time && slot.date === actualDate);
        const kort2 = slots.find((slot: Slot) => slot.kort === 2 && slot.time === time && slot.date === actualDate);
        const kort3 = slots.find((slot: Slot) => slot.kort === 3 && slot.time === time && slot.date === actualDate);
        const kort4 = slots.find((slot: Slot) => slot.kort === 4 && slot.time === time && slot.date === actualDate);
  
        return {
          time,
          kort1: kort1 ? false : true,
          kort2: kort2 ? false : true,
          kort3: kort3 ? false : true,
          kort4: kort4 ? false : true,
        };
      });
  
      this.timeSlots = filteredSlots; // Ekranda gösterilecek slotları ayarla
    });
  }
  

  // 08:00-22:00 arası her yarım saatte bir zaman dilimi üretir
  private generateTimeSlotsForDay(startHour: number, endHour: number): string[] {
    const timeSlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      timeSlots.push(`${hour}:00`);
      timeSlots.push(`${hour}:30`);
    }
    return timeSlots;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
