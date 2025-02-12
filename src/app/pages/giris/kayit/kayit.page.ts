import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-kayit',
  templateUrl: './kayit.page.html',
  styleUrls: ['./kayit.page.scss'],
})
export class KayitPage implements OnInit {
  user: Omit<User, 'id'> = {
    phoneNumber: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  confirmPassword: string = '';

  phoneNumberInvalid: boolean = false;
  passwordInvalid: boolean = false;
  confirmPasswordInvalid: boolean = false;

  constructor(private userService: UserService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  // Kullanıcıyı kayıt etmek için çağrılan fonksiyon
  async register() {
    this.resetValidationFlags();

    if (!this.isPhoneNumberValid(this.user.phoneNumber)) {
      this.phoneNumberInvalid = true;
    }

    if (!this.isPasswordValid(this.user.password)) {
      this.passwordInvalid = true;
    }

    if (this.user.password !== this.confirmPassword) {
      this.confirmPasswordInvalid = true;
    }

    if (this.phoneNumberInvalid || this.passwordInvalid || this.confirmPasswordInvalid) {
      return;
    }

    this.userService.registerUser(this.user)
      .then(() => {
        this.showSuccessAlert();
      })
      .catch(error => {
        console.error('Kayıt hatası:', error);
        this.showAlert('Hata', 'Kayıt hatası: ' + error);
      });
  }

  resetValidationFlags() {
    this.phoneNumberInvalid = false;
    this.passwordInvalid = false;
    this.confirmPasswordInvalid = false;
  }

  isPhoneNumberValid(phoneNumber: string): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  isPasswordValid(password: string): boolean {
    return password.length >= 8;
  }

  async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Başarılı',
      message: 'Kayıt işlemi başarılı.',
      buttons: [{
        text: 'Tamam',
        handler: () => {
          this.router.navigate(['/giris']); // Kullanıcıyı giriş sayfasına yönlendir
        }
      }]
    });

    await alert.present();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Tamam']
    });

    await alert.present();
  }
}
