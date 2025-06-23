import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { DeckListComponent } from '../components/deck-list/deck-list.component';
import { FlashcardsService } from '../services/flashcards.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    DeckListComponent,
    AsyncPipe,
  ],
})
export class DecksPage implements OnInit {
  private flashcardsService = inject(FlashcardsService);
  decks$ = this.flashcardsService.decks$;
  constructor() {}

  ngOnInit() {
    this.flashcardsService.getDecks().subscribe(console.log);
  }
}
