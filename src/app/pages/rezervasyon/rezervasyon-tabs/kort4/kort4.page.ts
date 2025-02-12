import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RezervasyonModalComponent } from 'src/app/pages/rezervasyon/rezervasyon-modal/rezervasyon-modal.component';
import { KortService } from 'src/app/services/kort.service';
import { DateService } from 'src/app/services/date.service';
import { Subscription } from 'rxjs';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-kort4',
  templateUrl: './kort4.page.html',
  styleUrls: ['./kort4.page.scss'],
})
export class Kort4Page implements OnInit, OnDestroy {
  timeSlots: { kort: number; time: string; isAvailable: boolean; player?: string; date: string }[] = [];
  selectedDate: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private modalController: ModalController,
    private kortService: KortService,
    private dateService: DateService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    const dateSubscription = this.dateService.selectedDate$.subscribe(date => {
      this.selectedDate = date;
      this.loadSlots();
    });
    this.subscriptions.push(dateSubscription);
  }

  loadSlots() {
    const slotsSubscription = this.kortService.allSlots$.subscribe(slots => {
      const kort4Slots = slots.filter(slot => slot.kort === 4);
      const actualDate = this.selectedDate.split('T')[0];
      const allTimeSlots = this.generateTimeSlotsForDay(8, 22);

      const filteredSlots = allTimeSlots.map(time => {
        const reservedSlot = kort4Slots.find(slot => slot.time === time && slot.date === actualDate);
        return reservedSlot ? reservedSlot : {
          kort: 4,
          time: time,
          isAvailable: true,
          player: '',
          date: actualDate
        };
      });

      this.timeSlots = filteredSlots;
    });
    
    this.subscriptions.push(slotsSubscription);
  }

  private generateTimeSlotsForDay(startHour: number, endHour: number): string[] {
    const timeSlots = [];
    for (let hour = startHour; hour < endHour; hour++) {
      timeSlots.push(`${hour}:00`);
      timeSlots.push(`${hour}:30`);
    }
    return timeSlots;
  }

  async onBadgeClick(slot: any) {
    if (slot.isAvailable) {
      const modal = await this.modalController.create({
        component: RezervasyonModalComponent,
        cssClass: 'custom-modal',
        componentProps: {
          startTime: slot.time,
          endTime: ''
        }
      });

      modal.onDidDismiss().then((result) => {
        const data = result.data;
        if (data) {
          this.reserveSlot(slot.time, data);
        }
      });

      await modal.present();
    } else {
      console.log('Slot dolu, rezervasyon yapılamaz.');
    }
  }

  async reserveSlot(time: string, data: { player: string; startTime: string; endTime: string; duration: number }) {
    try {
      await this.reservationService.createReservation({
        courtId: 4,
        date: new Date(this.selectedDate),
        startTime: time,
        duration: data.duration,
        playerName: data.player
      });

      const updatedSlots = this.timeSlots.map(slot => {
        if (slot.time === time) {
          return {
            ...slot,
            isAvailable: false,
            player: data.player
          };
        }
        return slot;
      });

      this.timeSlots = updatedSlots;
      this.kortService.updateKortSlots(4, updatedSlots);
      console.log('Rezervasyon başarıyla kaydedildi');
    } catch (error) {
      console.error('Rezervasyon hatası:', error);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
