import { inject } from '@angular/core';
import { Country } from './models/countries.types';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { CountriesService } from './services/countries.service';

export const countriesResolver: ResolveFn<Country[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(CountriesService).findAll();
};
