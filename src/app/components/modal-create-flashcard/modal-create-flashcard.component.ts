import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonHeader,
  IonToolbar,
  IonInput,
  IonContent,
  IonItem,
  IonButtons,
  IonTitle,
  ModalController,
  IonList,
  IonTextarea,
  IonFooter,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { FlashcardsService } from 'src/app/services/flashcards.service';
import { DeckModel } from 'src/app/services/interfaces/deck.interface';

@Component({
  selector: 'app-modal-create-flashcard',
  templateUrl: './modal-create-flashcard.component.html',
  styleUrls: ['./modal-create-flashcard.component.scss'],
  standalone: true,
  imports: [
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonFooter,
    IonTextarea,
    IonList,
    IonTitle,
    IonButtons,
    IonItem,
    IonContent,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class ModalCreateFlashcardComponent implements OnInit {
  form = this.fb.group({
    deck: [''],
    isDefaultDeck: [false],
    front: ['', [Validators.required]],
    back: ['', [Validators.required]],
  });
  decks: DeckModel[] = [];
  defaultDeck: DeckModel = {} as DeckModel;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private flashCardService: FlashcardsService
  ) {}

  ngOnInit() {
    this.flashCardService.decks$.subscribe((decks) => {
      this.decks = decks;
      this.defaultDeck = this.flashCardService.defaultDeck;
      this.form.patchValue({
        deck: this.defaultDeck.id,
        isDefaultDeck: this.defaultDeck.isDefault,
      });
    });
  }

  onWillDismiss(event: CustomEvent<any>) {
    if (event.detail.role === 'confirm') {
    }
  }

  create() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
