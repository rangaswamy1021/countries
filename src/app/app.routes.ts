import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'countries',
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('@features/countries/countries.routes').then(
        (m) => m.COUNTRIES_ROUTES,
      ),
  },
];
