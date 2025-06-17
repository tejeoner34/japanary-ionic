import { Component, Input, OnInit } from '@angular/core';
import {
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonChip,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { SearchResult } from 'src/app/services/interfaces/dictionary.interface';
import { WordMeaningComponent } from '../word-meaning/word-meaning.component';

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
    WordMeaningComponent,
  ],
})
export class SearchItemComponent {
  @Input() searchResult: SearchResult = {} as SearchResult;
  constructor() {}
}
