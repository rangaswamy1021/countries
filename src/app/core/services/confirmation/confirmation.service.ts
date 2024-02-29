import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationConfig } from './confirmation.types';
import { ConfirmationDialogComponent } from './dialog/dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private matDialog: MatDialog = inject(MatDialog);
  private _defaultConfig: ConfirmationConfig = {
    title: 'Confirm action',
    message: 'Are you sure you want to confirm this action?',
    confirmText: 'Yes',
    cancelText: 'No',
    dismissible: false,
    itemId: '',
  };

  /**
   * Constructor
   */
  constructor() {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(
    config: ConfirmationConfig = {},
    itemId?: string,
  ): MatDialogRef<ConfirmationDialogComponent> {
    // Merge the user config with the default config
    const userConfig = Object.assign(
      {},
      this._defaultConfig,
      { itemId },
      config,
    );

    // Open the dialog
    return this.matDialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      width: '500px',
      data: userConfig,
    });
  }
}
