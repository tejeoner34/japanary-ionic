import { Component, OnInit } from '@angular/core';
import {
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
  IonCard,
  IonCardTitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-deck-item',
  templateUrl: './deck-item.component.html',
  styleUrls: ['./deck-item.component.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
  ],
})
export class DeckItemComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
