import { Component, Input, OnInit } from '@angular/core';
import {
  IonCardContent,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { optionsOutline } from 'ionicons/icons';
import { DeckModel } from 'src/app/services/interfaces/deck.interface';

@Component({
  selector: 'app-deck-item',
  templateUrl: './deck-item.component.html',
  styleUrls: ['./deck-item.component.scss'],
  standalone: true,
  imports: [
    IonText,
    IonIcon,
    IonItem,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCardContent,
  ],
})
export class DeckItemComponent {
  @Input() deck: DeckModel = {} as DeckModel;
  constructor() {
    addIcons({
      optionsOutline,
    });
  }
}
