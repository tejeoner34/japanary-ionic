import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonFooter,
} from '@ionic/angular/standalone';
import { DictionarySearchFormComponent } from '../components/dictionary-search-form/dictionary-search-form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonFooter,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    DictionarySearchFormComponent,
  ],
})
export class HomePage {
  constructor() {}

  onSearch(query: string) {
    console.log('Search query:', query);
  }
}
