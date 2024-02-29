import { Injectable } from '@angular/core';
import { Country } from '../models/countries.types';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '@core/services/crud/crud.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService extends CrudService<Country, string> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/countries`);
  }
}
