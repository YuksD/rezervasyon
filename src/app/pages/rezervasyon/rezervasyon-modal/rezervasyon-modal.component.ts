import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rezervasyon-modal',
  templateUrl: './rezervasyon-modal.component.html',
  styleUrls: ['./rezervasyon-modal.component.scss'],
})
export class RezervasyonModalComponent implements OnInit {
  @Input() startTime: string = '';  // Başlangıç saati
  @Input() endTime: string = '';    // Bitiş saati (ilk hesaplama için)
  @Input() selectedDate: string = ''; // Seçilen tarih
  @Input() kortId: number = 0;
  
  selectedDuration: number = 60;    // Varsayılan süre
  playerName: string = '';          // Oyuncu ismi

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.updateEndTime();  // Başlangıçta endTime hesaplanıyor
  }

  // Süre değiştiğinde bitiş saatini yeniden hesapla
  updateEndTime() {
    const [hours, minutes] = this.startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + this.selectedDuration;
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    this.endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  }

  // Süreyi butonlarla seç
  selectDuration(duration: number) {
    this.selectedDuration = duration;  // Süreyi güncelle
    this.updateEndTime();  // Yeni süreye göre bitiş saatini hesapla
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async reserve() {
    if (!this.playerName) return; // Boş isim kontrolü

    await this.modalController.dismiss({
      player: this.playerName,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.selectedDuration,
      courtId: this.kortId
    });
  }
}
