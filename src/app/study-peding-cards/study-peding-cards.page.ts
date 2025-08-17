import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButton,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { FlashcardsService } from '../services/flashcards.service';
import { DeckModel } from '../services/interfaces/deck.interface';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { FlashCardModel } from '../services/interfaces/flashcard.interface';
import { addIcons } from 'ionicons';
import { fitness, happy, sad, thumbsUp } from 'ionicons/icons';

const resultButtons = [
  { color: 'danger', icon: 'sad' },
  { color: 'warning', icon: 'fitness' },
  { color: 'medium', icon: 'thumbs-up' },
  { color: 'success', icon: 'happy' },
];

@Component({
  selector: 'app-study-peding-cards',
  templateUrl: './study-peding-cards.page.html',
  styleUrls: ['./study-peding-cards.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonText,
    IonButton,
    IonFooter,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class StudyPedingCardsPage {
  flashcardsService = inject(FlashcardsService);
  router = inject(Router);
  deck: DeckModel = {} as DeckModel;
  currentVisibleCard: FlashCardModel = {} as FlashCardModel;

  isAnswerVisible = false;
  resultButtons = resultButtons;

  @Input() set deckId(id: string) {
    this.flashcardsService.decks$.pipe(take(1)).subscribe((decks) => {
      const currentDeck = decks.find((deck) => deck.id === id);
      if (!currentDeck) {
        this.router.navigate(['/decks']);
        return;
      }
      this.deck = currentDeck;
      console.log('Current deck:', this.deck);
      this.currentVisibleCard =
        this.deck.cards.pedingStudyCards[0] || ({} as FlashCardModel);
    });
  }
  constructor() {
    addIcons({ sad, fitness, thumbsUp, happy });
  }

  showAnswer() {
    this.isAnswerVisible = true;
  }
}
