import { Component, Input, OnInit } from '@angular/core';
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
  IonLabel,
} from '@ionic/angular/standalone';
import { switchMap } from 'rxjs';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';
import { DeckModel } from 'src/app/services/interfaces/deck.interface';
import { SearchResult } from 'src/app/services/interfaces/dictionary.interface';
import { FlashCard } from 'src/app/services/interfaces/flashcard.interface';
import { SaveImageService } from 'src/app/services/save-image.service';
import { createFormBackTemplate } from 'src/utils/template-formatting';

@Component({
  selector: 'app-modal-create-flashcard',
  templateUrl: './modal-create-flashcard.component.html',
  styleUrls: ['./modal-create-flashcard.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
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
  @Input() searchResult: SearchResult = {} as SearchResult;
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
    private flashCardService: FlashcardsService,
    private saveImageService: SaveImageService,
    private dictionaryService: DictionaryService
  ) {}

  ngOnInit() {
    this.flashCardService.decks$.subscribe((decks) => {
      this.decks = decks;
      this.defaultDeck = this.flashCardService.defaultDeck;
      this.form.patchValue({
        deck: this.defaultDeck.id,
        isDefaultDeck: this.defaultDeck.isDefault,
        front: this.searchResult.slug || '',
        back: createFormBackTemplate(this.searchResult) || '',
      });
    });

    this.dictionaryService.aiResponse$.subscribe((response) => {
      this.form.patchValue({
        back: this.form.value.back + '\n' + '\n' + response,
      });
    });
  }

  onWillDismiss(event: CustomEvent<any>) {
    if (event.detail.role === 'confirm') {
    }
  }

  create() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saveImageService
      .uploadImages(this.saveImageService.images())
      .pipe(
        switchMap((uploadedImages) => {
          const newFlashCardData = new FlashCard({
            front: this.form.value.front || '',
            back: this.form.value.back || '',
            deckId: this.form.value.deck || '',
            imagesUrl: uploadedImages,
          });
          return this.flashCardService.createFlashCard(newFlashCardData);
        })
      )
      .subscribe(console.log);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  handleTextareaPaste(event: ClipboardEvent) {
    const clipboardItems = event.clipboardData?.items;
    if (!clipboardItems) return;
    for (let i = 0; i < clipboardItems.length; i++) {
      const file = clipboardItems[i].getAsFile();
      if (file) this.saveImageService.addImage(file);
    }
  }

  onRequestAiResponse() {
    if (this.form.value.front)
      this.dictionaryService.searchAi(this.form.value.front);
  }
}
