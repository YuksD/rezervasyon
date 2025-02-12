import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { provideAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ]
})
export class LoginPage implements OnInit {

  form!: FormGroup;
  isLogin = signal<boolean>(false);
  errorMessage: string = '';
  isLoading = signal<boolean>(false);


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)] }),


    })
  }

  async onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage = '';

    try {
      await this.authService.login(
        this.form.get('email')?.value,
        this.form.get('password')?.value
      );
      this.router.navigate(['/anasayfa']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Giriş yapılırken bir hata oluştu';
      console.error('Login error:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
