import { NavigationEnd, Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class SplashScreenService {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe(() => {
        this.hide();
      });
  }

  show(): void {
    this.document.body.classList.remove('core-splash-screen-hidden');
  }

  hide(): void {
    this.document.body.classList.add('core-splash-screen-hidden');
  }
}
