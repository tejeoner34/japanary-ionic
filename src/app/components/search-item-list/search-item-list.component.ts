import { Component, Input } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { SearchResult } from 'src/app/services/interfaces/dictionary.interface';
import { SearchItemComponent } from '../search-item/search-item.component';

@Component({
  selector: 'app-search-item-list',
  templateUrl: './search-item-list.component.html',
  styleUrls: ['./search-item-list.component.scss'],
  standalone: true,
  imports: [IonList, SearchItemComponent],
})
export class SearchItemListComponent {
  @Input() items: SearchResult[] = [];
  constructor() {}
}
