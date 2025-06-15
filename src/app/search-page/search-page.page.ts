import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
} from '@ionic/angular/standalone';
import { DictionarySearchFormComponent } from '../components/dictionary-search-form/dictionary-search-form.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    DictionarySearchFormComponent,
  ],
})
export class SearchPagePage {
  @Input() set query(searchQuery: string) {
    console.log('Search query:', searchQuery);
    this.searchQuery = searchQuery;
  }

  searchQuery: string = '';

  constructor() {}
}
