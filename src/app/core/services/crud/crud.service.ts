import { Injectable } from '@angular/core';
import { CrudOperations } from '@core/models/crud-operations.types';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  private readonly entities: BehaviorSubject<T[] | null> = new BehaviorSubject(
    null,
  );

  constructor(
    protected _http: HttpClient,
    protected _base: string,
  ) {}

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._base + '/' + id, t, {});
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._base + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._base).pipe(
      tap((response) => {
        this.entities.next(response);
      }),
    );
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id);
  }

  get entities$(): Observable<T[]> {
    return this.entities.asObservable();
  }
}
