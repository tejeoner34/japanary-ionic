import { Routes } from '@angular/router';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'search/:query',
    loadComponent: () =>
      import('./search-page/search-page.page').then((m) => m.SearchPagePage),
  },
  {
    path: 'decks',
    loadComponent: () => import('./decks/decks.page').then((m) => m.DecksPage),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
    canActivate: [guestGuard],
  },
  {
    path: 'study-peding-cards/:deckId',
    loadComponent: () =>
      import('./study-peding-cards/study-peding-cards.page').then(
        (m) => m.StudyPedingCardsPage
      ),
  },
];

export const APP_ROUTES = {
  home: '',
  search: (query: string) => `/search/${query}`,
};
