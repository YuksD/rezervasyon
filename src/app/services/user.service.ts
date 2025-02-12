import { Injectable } from '@angular/core';

export interface User {
  id: number;
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, phoneNumber: '5551234567', password: 'password1', firstName: 'John', lastName: 'Doe' },
    { id: 2, phoneNumber: '5552345678', password: 'password2', firstName: 'Jane', lastName: 'Smith' },
    { id: 3, phoneNumber: '5553456789', password: 'password3', firstName: 'Alice', lastName: 'Johnson' }
  ];

  // Telefon numarası ve şifreye göre kullanıcıyı bulan fonksiyon
  getUser(phoneNumber: string, password: string): User | undefined {
    return this.users.find(user => user.phoneNumber === phoneNumber && user.password === password);
  }

  // Yeni bir kullanıcıyı kaydeden fonksiyon
  registerUser(user: Omit<User, 'id'>): Promise<void> {
    return new Promise((resolve, reject) => {
      // Kullanıcıya benzersiz bir ID vermek için son kullanıcının ID'sini alın
      const lastUserId = this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
      const newUser: User = { ...user, id: lastUserId + 1 }; // Yeni kullanıcıyı oluştur

      // Aynı telefon numarasına sahip bir kullanıcı olup olmadığını kontrol et
      const existingUser = this.users.find(u => u.phoneNumber === user.phoneNumber);
      if (existingUser) {
        reject('Bu telefon numarasıyla kayıtlı bir kullanıcı zaten var.');
        return;
      }

      this.users.push(newUser); // Kullanıcıyı kullanıcılar listesine ekle
      resolve(); // Kayıt işlemi başarılı oldu, Promise'i çöz
    });
  }
}
