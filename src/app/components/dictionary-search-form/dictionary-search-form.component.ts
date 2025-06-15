import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, IonButton } from '@ionic/angular/standalone';
import { APP_ROUTES } from 'src/app/app.routes';

@Component({
  selector: 'app-dictionary-search-form',
  templateUrl: './dictionary-search-form.component.html',
  styleUrls: ['./dictionary-search-form.component.scss'],
  standalone: true,
  imports: [IonButton, IonSearchbar],
})
export class DictionarySearchFormComponent {
  readonly routes = APP_ROUTES;
  searchQuery: string = '';
  constructor(private router: Router) {}

  onInputChange(event: any) {
    const trimmedValue = event.target.value.trim();
    this.searchQuery = trimmedValue;
  }

  onNavigate() {
    if (this.searchQuery) {
      this.router.navigate([this.routes.search(this.searchQuery)]);
    }
  }
}
