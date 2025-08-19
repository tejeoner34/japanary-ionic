import { Component, inject, Input } from '@angular/core';
import {
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonChip,
  IonCardContent,
  IonButton,
  ModalController,
} from '@ionic/angular/standalone';
import { SearchResult } from 'src/app/services/interfaces/dictionary.interface';
import { WordMeaningComponent } from '../word-meaning/word-meaning.component';
import { AuthService } from 'src/app/services/auth.service';
import { AsyncPipe } from '@angular/common';
import { ModalCreateFlashcardComponent } from '../modal-create-flashcard/modal-create-flashcard.component';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonChip,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonCardHeader,
    IonButton,
    WordMeaningComponent,
    AsyncPipe,
  ],
})
export class SearchItemComponent {
  @Input() searchResult: SearchResult = {} as SearchResult;

  private authService = inject(AuthService);
  private modalCtrl = inject(ModalController);
  readonly currentUser$ = this.authService.currentUser$;

  constructor() {}

  async onCreateCard() {
    const modal = await this.modalCtrl.create({
      component: ModalCreateFlashcardComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('Card created:', data);
    }
  }
}
