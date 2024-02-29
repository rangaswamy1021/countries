import { Routes } from '@angular/router';
import { CountryListComponent } from './containers/country/list.component';
import { countriesResolver } from './countries.resolver';
import { CountryAddEditComponent } from './containers/country/add-edit/add-edit.component';

export const COUNTRIES_ROUTES: Routes = [
  {
    path: '',
    component: CountryListComponent,
    resolve: {
      countries: countriesResolver,
    },
  },
  {
    path: 'add',
    component: CountryAddEditComponent,
  },
  { path: 'edit/:id', component: CountryAddEditComponent },
];
