import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giris',
  templateUrl: './giris.page.html',
  styleUrls: ['./giris.page.scss'],
})
export class GirisPage implements OnInit {
  username = '';
  password = '';
  errorMessage: string = ''; // Hata mesajı için değişken

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  // Kullanıcıyı giriş yapmak için çağrılan fonksiyon
  login() {
    const user = this.userService.getUser(this.username, this.password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.router.navigate(['/anasayfa']); // Kullanıcı giriş yaptığında ana sayfaya yönlendir
      this.errorMessage = ''; // Başarılı girişte hata mesajını temizle
    } else {
      this.errorMessage = 'Kullanıcı adı veya şifre yanlış'; // Hatalı girişte mesaj göster
      console.error('Giriş hatası: Kullanıcı adı veya şifre yanlış.');
    }
  }
}
