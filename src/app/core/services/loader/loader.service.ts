import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable } from '@angular/core';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor() {}

  private readonly isLoading$ = new BehaviorSubject<boolean>(false);

  show() {
    this.isLoading$.next(true);
  }

  hide() {
    this.isLoading$.next(false);
  }

  get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable().pipe(share());
  }
}
