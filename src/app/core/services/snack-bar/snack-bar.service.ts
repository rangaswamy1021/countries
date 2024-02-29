import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack/snack.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(readonly snackBar: MatSnackBar) {}

  openSanckBar(
    message?: string | string[],
    statusClass = 'st-snack-success',
    duration: number = 5000000,
  ): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration,
      data: message,
      panelClass: [statusClass],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  dissmissSnackBar(): void {
    this.snackBar.dismiss();
  }
}
