import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RezervasyonModalComponent } from 'src/app/pages/rezervasyon/rezervasyon-modal/rezervasyon-modal.component';
import { KortService } from 'src/app/services/kort.service';
import { DateService } from 'src/app/services/date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kort4',
  templateUrl: './kort4.page.html',
  styleUrls: ['./kort4.page.scss'],
})
export class Kort4Page implements OnInit {
  timeSlots: { kort: number; time: string; isAvailable: boolean; player?: string; date: string }[] = [];
  selectedDate: string = '';
  private subscriptions: Subscription[] = []; // Abonelikleri saklayacak dizi

  constructor(
    private modalController: ModalController,
    private kortService: KortService,
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
    const slotsSubscription = this.kortService.allSlots$.subscribe(slots => {
      // Kort numarasına göre filtreleme yap (Kort 4)
      const kort4Slots = slots.filter(slot => slot.kort === 4);
      const actualDate = this.selectedDate.split('T')[0]; // Seçilen tarihin formatı

      // Kortun tüm zaman dilimlerini oluşturun (08:00-22:00 gibi)
      const allTimeSlots = this.generateTimeSlotsForDay(8, 22); // 08:00 - 22:00 arası

      // Gelen kort4 rezervasyonlarıyla boş slotları birleştirin
      const filteredSlots = allTimeSlots.map(time => {
        const reservedSlot = kort4Slots.find(slot => slot.time === time && slot.date === actualDate);
        return reservedSlot ? reservedSlot : {
          kort: 4, // Kort numarası
          time: time,
          isAvailable: true, // Eğer rezervasyon yoksa boş slot
          player: '',
          date: actualDate
        };
      });

      // Ekranda gösterilecek slotları ayarla
      this.timeSlots = filteredSlots;
    });
    
    this.subscriptions.push(slotsSubscription);
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

  // Modal açma ve rezervasyon yapma fonksiyonu
  async onBadgeClick(slot: any) {
    if (slot.isAvailable) {
      const modal = await this.modalController.create({
        component: RezervasyonModalComponent,
        cssClass: 'custom-modal',
        componentProps: {
          startTime: slot.time, // Başlangıç saati modala gönderiliyor
          endTime: '' // Bitiş saati modül içinde hesaplanacak
        }
      });

      modal.onDidDismiss().then((result) => {
        const data = result.data;
        if (data) {
          this.reserveSlot(slot.time, data); // Slotu rezerve et
        }
      });

      await modal.present();
    } else {
      console.log('Slot dolu, rezervasyon yapılamaz.');
    }
  }

  // Slotu rezerve etme işlemi
  reserveSlot(time: string, data: { player: string; startTime: string; endTime: string; duration: number }) {
    const updatedSlots = this.timeSlots.map(slot => {
      if (slot.time === time) {
        return {
          ...slot,
          isAvailable: false, // Slot artık dolu
          player: data.player // Oyuncu ismi ekleniyor
        };
      }
      return slot;
    });

    // Güncellenmiş slotları ayarla
    this.timeSlots = updatedSlots;

    // Kort bilgilerini KortService'e göndererek güncelle
    this.kortService.updateKortSlots(4, updatedSlots); // Kort numarası 4
  }

  // Bileşen yok edilirken tüm abonelikleri iptal et
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
