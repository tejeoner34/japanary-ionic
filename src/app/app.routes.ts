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
];

export const APP_ROUTES = {
  home: '',
  search: (query: string) => `/search/${query}`,
};
