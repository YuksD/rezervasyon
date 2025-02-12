import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

form!: FormGroup;
  isSignup = signal<boolean>(false);


  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required] }),
      email: new FormControl(null, {validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)] }),


    })
  }

  onSubmit() {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    
  }

}
