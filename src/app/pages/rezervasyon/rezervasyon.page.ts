import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RezervasyonModalComponent } from './rezervasyon-modal/rezervasyon-modal.component';
import { DateService } from 'src/app/services/date.service';
import { KortService } from 'src/app/services/kort.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-rezervasyon',
  templateUrl: './rezervasyon.page.html',
  styleUrls: ['./rezervasyon.page.scss'],
})
export class RezervasyonPage implements OnInit {
  selectedDate: string;
  selectedDay: string = 'today';
  userReservations: any[] = []; // Kullanıcının rezervasyonlarını tutacak array

  constructor(
    private modalController: ModalController,
    private dateService: DateService,
    private kortService: KortService,
    private reservationService: ReservationService, // Yeni servis eklendi
    public router: Router
  ) {
    this.selectedDate = new Date().toISOString();
  }

  async ngOnInit() {
    this.dateService.setSelectedDate(this.selectedDate);
    this.kortService.loadSlotsForDate(this.selectedDate);
    
    // Kullanıcının rezervasyonlarını yükle
    try {
      this.userReservations = await this.reservationService.getUserReservations();
    } catch (error) {
      console.error('Rezervasyonlar yüklenirken hata:', error);
    }
  }

  async openReservationModal(startTime: string, endTime: string) {
    const modal = await this.modalController.create({
      component: RezervasyonModalComponent,
      cssClass: 'custom-modal',
      componentProps: {
        startTime: startTime,
        endTime: endTime,
        selectedDate: this.selectedDate
      }
    });

    // Modal kapandığında
    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        try {
          // Yeni rezervasyon oluştur
          await this.reservationService.createReservation({
            courtId: result.data.courtId,
            date: new Date(this.selectedDate),
            startTime: startTime,
            duration: result.data.duration
          });
          
          // Rezervasyon listesini güncelle
          this.userReservations = await this.reservationService.getUserReservations();
          
          // Kort slotlarını yeniden yükle
          this.kortService.loadSlotsForDate(this.selectedDate);
        } catch (error) {
          console.error('Rezervasyon oluşturulurken hata:', error);
        }
      }
    });

    return await modal.present();
  }

  async cancelReservation(reservationId: string) {
    try {
      await this.reservationService.cancelReservation(reservationId);
      // Rezervasyon listesini güncelle
      this.userReservations = await this.reservationService.getUserReservations();
      // Kort slotlarını yeniden yükle
      this.kortService.loadSlotsForDate(this.selectedDate);
    } catch (error) {
      console.error('Rezervasyon iptal edilirken hata:', error);
    }
  }

  setDate(value: string) {
    const today = new Date();

    if (value === 'today') {
      this.selectedDate = today.toISOString();
      this.selectedDay = 'today';
    } else if (value === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      this.selectedDate = tomorrow.toISOString();
      this.selectedDay = 'tomorrow';
    }

    this.updateDateService();
    this.kortService.loadSlotsForDate(this.selectedDate);
    // Seçilen tarihe göre rezervasyonları güncelle
    this.loadReservationsForDate();
  }

  private updateDateService() {
    this.dateService.setSelectedDate(this.selectedDate);
  }

  private async loadReservationsForDate() {
    try {
      this.userReservations = await this.reservationService.getUserReservations();
    } catch (error) {
      console.error('Rezervasyonlar yüklenirken hata:', error);
    }
  }
}
