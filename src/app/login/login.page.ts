import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonMenuButton,
    IonButtons,
    IonInput,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class LoginPage {
  private authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.signIn(this.email, this.password).subscribe((user) => {
        console.log('User logged in:', user);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  register() {}

  get email() {
    return this.form.get('email')?.value || '';
  }

  get password() {
    return this.form.get('password')?.value || '';
  }
}
