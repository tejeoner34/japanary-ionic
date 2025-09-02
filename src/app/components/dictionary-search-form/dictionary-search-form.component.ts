import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonSearchbar,
  IonButton,
  IonIcon,
  IonItem,
} from '@ionic/angular/standalone';
import { clipboardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { APP_ROUTES } from 'src/app/app.routes';

@Component({
  selector: 'app-dictionary-search-form',
  templateUrl: './dictionary-search-form.component.html',
  styleUrls: ['./dictionary-search-form.component.scss'],
  standalone: true,
  imports: [IonItem, IonIcon, IonButton, IonSearchbar],
})
export class DictionarySearchFormComponent {
  readonly routes = APP_ROUTES;
  @Input() searchQuery: string = '';
  constructor(private router: Router) {
    addIcons({ clipboardOutline });
  }

  onInputChange(event: any) {
    const trimmedValue = event.target.value.trim();
    this.searchQuery = trimmedValue;
  }

  onNavigate() {
    if (this.searchQuery) {
      this.router.navigate([this.routes.search(this.searchQuery)]);
    }
  }

  async onPasteClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      this.searchQuery = text;
    } catch (err) {
      console.error('クリップボードからの読み取りに失敗:', err);
    }
  }
}
