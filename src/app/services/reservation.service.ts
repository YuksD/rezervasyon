import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, query, where, getDocs, deleteDoc, doc } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

export interface Reservation {
  userId: string;
  courtId: number;
  date: Date;
  startTime: string;
  duration: number;
  playerName: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  // Yeni rezervasyon oluştur
  async createReservation(data: Omit<Reservation, 'userId' | 'createdAt'>) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Kullanıcı girişi yapılmamış');

    const reservation: Reservation = {
      ...data,
      userId: user.uid,
      createdAt: new Date()
    };

    const reservationsRef = collection(this.firestore, 'reservations');
    return addDoc(reservationsRef, reservation);
  }

  // Kullanıcının rezervasyonlarını getir
  async getUserReservations() {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Kullanıcı girişi yapılmamış');

    const reservationsRef = collection(this.firestore, 'reservations');
    const q = query(reservationsRef, where('userId', '==', user.uid));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // Rezervasyon iptal et
  async cancelReservation(reservationId: string) {
    const user = this.auth.currentUser;
    if (!user) throw new Error('Kullanıcı girişi yapılmamış');

    const reservationRef = doc(this.firestore, 'reservations', reservationId);
    return deleteDoc(reservationRef);
  }
} 