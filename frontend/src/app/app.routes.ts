import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'login',
    loadComponent: () =>
      import('./login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
]
