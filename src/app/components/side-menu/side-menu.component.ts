import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonIcon,
  IonItem,
  IonList,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, logOutOutline, schoolOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonMenuToggle,
    RouterModule,
    AsyncPipe,
  ],
})
export class SideMenuComponent {
  private authService = inject(AuthService);
  currentUser$ = this.authService.currentUser$;
  links = [
    { title: 'Dictioanry', url: '/', icon: 'book-outline' },
    { title: 'Decks', url: '/decks', icon: 'school-outline' },
  ];

  constructor() {
    addIcons({ bookOutline, schoolOutline, logOutOutline });
  }

  logout() {
    this.authService.signOut();
  }
}
