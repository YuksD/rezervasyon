import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RezervasyonModalComponent } from '../pages/rezervasyon/rezervasyon-modal/rezervasyon-modal.component';
import { KortService } from './kort.service';

@Injectable({
  providedIn: 'root'
})
export class KortPageService {
  constructor(
    private modalController: ModalController,
    private kortService: KortService
  ) {}

  async openReservationModal(time: string, kortId: number, selectedDate: string) {
    const modal = await this.modalController.create({
      component: RezervasyonModalComponent,
      componentProps: {
        startTime: time,
        kortId: kortId,
        selectedDate: selectedDate
      }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        try {
          await this.kortService.createReservation(
            result.data.courtId,
            result.data.startTime,
            result.data.duration
          );
          // Başarılı rezervasyon sonrası slotları güncelle
          this.kortService.loadSlotsForDate(selectedDate);
        } catch (error) {
          console.error('Rezervasyon hatası:', error);
        }
      }
    });

    return await modal.present();
  }
} 