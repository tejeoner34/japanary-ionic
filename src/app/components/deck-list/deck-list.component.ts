import { Component, Input } from '@angular/core';
import { Deck } from 'src/app/services/interfaces/deck.interface';
import { IonList } from '@ionic/angular/standalone';
import { DeckItemComponent } from '../deck-item/deck-item.component';

@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.scss'],
  standalone: true,
  imports: [IonList, DeckItemComponent],
})
export class DeckListComponent {
  @Input() decks: Deck[] = [];

  constructor() {}
}
