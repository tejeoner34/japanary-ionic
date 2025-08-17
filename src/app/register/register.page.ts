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
  IonButtons,
  IonMenuButton,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { passwordsMatchValidator } from 'src/utils/validators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonMenuButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonInput,
  ],
})
export class RegisterPage {
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  form: FormGroup;

  constructor() {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: passwordsMatchValidator,
      }
    );
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.createUser(this.email, this.password).subscribe((user) => {
      console.log('User registered:', user);
      this.router.navigate(['/decks']);
    });
  }

  get email() {
    return this.form.get('email')?.value || '';
  }

  get password() {
    return this.form.get('password')?.value || '';
  }

  get confirmPassword() {
    return this.form.get('confirmPassword')?.value || '';
  }
}
