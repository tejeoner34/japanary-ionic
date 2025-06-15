import { Component, EventEmitter, Output } from '@angular/core';
import { IonSearchbar, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dictionary-search-form',
  templateUrl: './dictionary-search-form.component.html',
  styleUrls: ['./dictionary-search-form.component.scss'],
  standalone: true,
  imports: [IonButton, IonSearchbar],
})
export class DictionarySearchFormComponent {
  searchQuery: string = '';
  @Output() search = new EventEmitter<string>();
  constructor() {}

  onInputChange(event: any) {
    this.searchQuery = event.target.value;
  }

  onSubmit() {
    if (this.searchQuery.trim()) {
      this.search.emit(this.searchQuery.trim());
      this.searchQuery = '';
    }
  }
}
