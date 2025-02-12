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
  selectedDuration: number = 60;    // Varsayılan süre
  playerName: string = '';          // Oyuncu ismi

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.updateEndTime();  // Başlangıçta endTime hesaplanıyor
  }

  // Süre değiştiğinde bitiş saatini yeniden hesapla
  updateEndTime() {
    const [startHour, startMinute] = this.startTime.split(':').map(Number);
    const totalStartMinutes = startHour * 60 + startMinute;
    const totalEndMinutes = totalStartMinutes + this.selectedDuration; // Güncelleme
    const endHour = Math.floor(totalEndMinutes / 60) % 24; // 24 saat formatı
    const endMinute = totalEndMinutes % 60;
    const formattedEndHour = endHour.toString().padStart(2, '0');
    const formattedEndMinute = endMinute.toString().padStart(2, '0');
    this.endTime = `${formattedEndHour}:${formattedEndMinute}`;
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
    await this.modalController.dismiss({
      player: this.playerName,
      startTime: this.startTime,
      endTime: this.endTime,
      duration: this.selectedDuration
    });
  }
}
