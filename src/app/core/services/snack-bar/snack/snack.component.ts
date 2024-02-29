import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSnackBarModule, MatButtonModule],
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.scss'],
})
export class SnackBarComponent {
  errors = [];
  error: string;
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    if (Array.isArray(this.data)) {
      this.errors = this.data;
    } else {
      this.error = this.data;
    }
  }
}
