import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/profil.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  profil: Profile = {
    firstName: 'Yüksel',
    lastName: 'Demirel',
    age: 27,
    gender: 'Erkek',
    phoneNumber: '555-123-45-67',
    achievements: [
      { date: '2024', event: '2024 18+ Erkekler Tekler', position: 'İkincisi' },
      { date: '2023', event: 'AFTEK Kulüp Şampiyonası', position: 'Birincisi' }
    ]
  };

  constructor() { }

  ngOnInit() { }

  // Profil fotoğrafı değiştirme butonu işlevi
  onChangePhoto() {
    console.log('Profil fotoğrafı değiştirme işlemi');
  }

  // Şifre değiştirme butonu işlevi
  onChangePassword() {
    console.log('Şifre değiştirme işlemi');
  }
}
