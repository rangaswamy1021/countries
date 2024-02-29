import { NgClass, NgIf } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationConfig } from '../confirmation.types';

@Component({
  selector: 'fuse-confirmation-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatDialogModule, MatIconModule, NgClass],
})
export class ConfirmationDialogComponent {
  /**
   * Constructor
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationConfig,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
