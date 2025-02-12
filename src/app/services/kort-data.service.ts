import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KortDataService {
  private kortlarUrl = 'assets/kortlar.json'; // JSON dosyası yolu
  private rezervasyonlarUrl = 'assets/rezervasyonlar.json'; // JSON dosyası yolu

  constructor(private http: HttpClient) { }

  // Kort bilgilerini JSON dosyasından yükleyen fonksiyon
  getKortlar(): Observable<any> {
    return this.http.get(this.kortlarUrl);
  }

  // Rezervasyon bilgilerini JSON dosyasından yükleyen fonksiyon
  getRezervasyonlar(): Observable<any> {
    return this.http.get(this.rezervasyonlarUrl);
  }
}
