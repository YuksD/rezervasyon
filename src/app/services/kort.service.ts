import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KortDataService } from './kort-data.service';
import { DateService } from './date.service';  // DateService'i içe aktar

interface Kort {
  kort: number;
  startHour: number;
  endHour: number;
}

interface Rezervasyon {
  kort: number;
  time: string;
  isAvailable: boolean;
  player?: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class KortService {
  private allSlots = new BehaviorSubject<Rezervasyon[]>([]);  // Arayüz tipinde tanımlandı
  allSlots$ = this.allSlots.asObservable();
  private rezervasyonlar: Rezervasyon[] = [];  // any[] yerine Rezervasyon arayüzü kullanıldı

  constructor(private kortDataService: KortDataService, private dateService: DateService) {
    // DateService'e abone olundu
    this.dateService.selectedDate$.subscribe(selectedDate => {
      this.loadSlotsForDate(selectedDate);
    });
  }

  // Seçilen tarih için slotları yükler
  public loadSlotsForDate(selectedDate: string) {
    const selectedDateFormatted = selectedDate.split('T')[0]; // Tarih formatı alınır
    this.loadAllKortSlots(); // Tüm kort slotları yüklenir

    // Slotları filtreler (YYYY-MM-DD formatında)
    const filteredSlots = this.allSlots.value.filter(slot => slot.date === selectedDateFormatted);
    this.allSlots.next(filteredSlots); // Filtrelenmiş slotlar güncellenir
  }

  // Kort ve rezervasyon bilgilerini yükler
  private loadAllKortSlots() {
    this.kortDataService.getRezervasyonlar().subscribe(rezervasyonlar => {
      this.rezervasyonlar = rezervasyonlar.rezervasyonlar;
      this.kortDataService.getKortlar().subscribe(kortlar => {
        kortlar.kortlar.forEach((kort: Kort) => this.loadKortSlots(kort.kort, kort.startHour, kort.endHour));
      });
    });
  }

  // Kort için slot bilgilerini yükler
  private loadKortSlots(kortNumber: number, startHour: number, endHour: number) {
    const slots = this.generateTimeSlots(kortNumber, startHour, endHour);
    this.updateKortSlots(kortNumber, slots); // Slotları günceller
  }

  // Kort için boş ve dolu slotları oluşturur
  private generateTimeSlots(kortNumber: number, startHour: number, endHour: number) {
    const slots = [];

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(this.createSlot(kortNumber, `${hour}:00`));
      slots.push(this.createSlot(kortNumber, `${hour}:30`));
    }

    return slots;
  }

  // Tek bir slot oluşturur
  private createSlot(kortNumber: number, time: string) {
    const reservation = this.rezervasyonlar.find(r => r.kort === kortNumber && r.time === time);
    return {
      kort: kortNumber,
      time: time,
      isAvailable: !reservation,  // Rezervasyon yoksa true
      player: reservation ? reservation.player : undefined,
      date: reservation ? reservation.date : ''  // Tarihi JSON'dan al
    };
  }

  // Kort için slotları günceller
  public updateKortSlots(kortNumber: number, slots: Rezervasyon[]) {
    const kortSlots = slots.map(slot => ({
      kort: kortNumber,
      time: slot.time,
      isAvailable: slot.isAvailable,
      player: slot.player || '',
      date: slot.date
    }));
    this.updateAllSlots(kortSlots);  // Tüm slotları günceller
  }

  // Tüm kortlardaki slotları günceller
  private updateAllSlots(newSlots: Rezervasyon[]) {
    const currentSlots = this.allSlots.value;
    //console.log(currentSlots, 'current slots');


    // Mevcut slotları yeni slotlarla güncelle
    const updatedSlots = currentSlots.map(slot => {
      const matchingNewSlot = newSlots.find(newSlot => newSlot.kort === slot.kort && newSlot.time === slot.time);
      return matchingNewSlot ? { ...slot, ...matchingNewSlot } : slot;
    });

    // Yeni slotlardan, mevcutta olmayanları ekle
    const additionalSlots = newSlots.filter(newSlot =>
      !currentSlots.some(slot => slot.kort === newSlot.kort && slot.time === newSlot.time)
    );

    // Tüm slotları birleştir ve güncelle
    this.allSlots.next([...updatedSlots, ...additionalSlots]);
  }

  // Bileşen yok edilirken tüm abonelikleri iptal et (isteğe bağlı, eğer varsa)
  // ngOnDestroy() {
  //   this.subscriptions.forEach(subscription => subscription.unsubscribe());
  // }
}
