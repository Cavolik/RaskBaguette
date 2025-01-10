import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full',
  },
  {
    path: 'store',
    loadComponent: () =>
      import('./store-page/store-page.component').then((m) => m.StorePageComponent),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin-page/admin-page.component').then((m) => m.AdminPageComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
  },
]
