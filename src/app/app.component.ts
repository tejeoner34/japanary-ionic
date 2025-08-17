import { Component, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonSpinner,
} from '@ionic/angular/standalone';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AuthService } from './services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonSpinner,
    IonApp,
    IonRouterOutlet,
    SideMenuComponent,
    IonMenu,
    AsyncPipe,
  ],
})
export class AppComponent {
  authService = inject(AuthService);
  isLoading = this.authService.isFirebaseUserLoading$;
  constructor() {}
}
