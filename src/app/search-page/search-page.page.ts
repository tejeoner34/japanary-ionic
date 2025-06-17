import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonList,
} from '@ionic/angular/standalone';
import { DictionarySearchFormComponent } from '../components/dictionary-search-form/dictionary-search-form.component';
import { DictionaryService } from '../services/dictionary.service';
import { SearchItemSkeletonComponent } from '../components/search-item-skeleton/search-item-skeleton.component';
import { SearchItemListComponent } from '../components/search-item-list/search-item-list.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
  standalone: true,
  imports: [
    IonList,
    IonFooter,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    DictionarySearchFormComponent,
    SearchItemSkeletonComponent,
    SearchItemListComponent,
  ],
})
export class SearchPagePage {
  private dictionaryService = inject(DictionaryService);
  public loading$ = this.dictionaryService.loading$;
  public results$ = this.dictionaryService.results$;
  public error$ = this.dictionaryService.error$;
  @Input() set query(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.dictionaryService.searchWord(searchQuery);
  }

  searchQuery: string = '';

  constructor() {}
}
