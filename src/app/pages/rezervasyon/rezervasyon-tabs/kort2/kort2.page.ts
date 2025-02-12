import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RezervasyonModalComponent } from 'src/app/pages/rezervasyon/rezervasyon-modal/rezervasyon-modal.component';
import { KortService } from 'src/app/services/kort.service';
import { DateService } from 'src/app/services/date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kort2',
  templateUrl: './kort2.page.html',
  styleUrls: ['./kort2.page.scss'],
})
export class Kort2Page implements OnInit, OnDestroy {
  timeSlots: { kort: number; time: string; isAvailable: boolean; player?: string; date: string }[] = [];
  selectedDate: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private modalController: ModalController,
    private kortService: KortService,
    private dateService: DateService
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
      const kort2Slots = slots.filter(slot => slot.kort === 2);
      const actualDate = this.selectedDate.split('T')[0];

      const allTimeSlots = this.generateTimeSlotsForDay(8, 22);

      const filteredSlots = allTimeSlots.map(time => {
        const reservedSlot = kort2Slots.find(slot => slot.time === time && slot.date === actualDate);
        return reservedSlot ? reservedSlot : {
          kort: 2,
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

  reserveSlot(time: string, data: { player: string; startTime: string; endTime: string; duration: number }) {
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
    this.kortService.updateKortSlots(2, updatedSlots); // Kort numarası 2
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
