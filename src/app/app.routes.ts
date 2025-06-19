import { Routes } from '@angular/router';

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
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
];

export const APP_ROUTES = {
  home: '',
  search: (query: string) => `/search/${query}`,
};
