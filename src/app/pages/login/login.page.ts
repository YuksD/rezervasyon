import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form!: FormGroup;
  isLogin = signal<boolean>(false);


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
      return;
    }

    try {
      await this.authService.login(
        this.form.get('email')?.value,
        this.form.get('password')?.value
      );
      this.router.navigate(['/anasayfa']);
    } catch (error) {
      console.error('Login error:', error);
    }
  }
}
