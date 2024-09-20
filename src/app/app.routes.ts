import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home'),
  },
  {
    path: 'country/:countryId',
    loadComponent: () => import('./country'),
  },
];
