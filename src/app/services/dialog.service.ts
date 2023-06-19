import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../share/dialog/dialog.component';
import { DialogUserComponent } from '../share/dialog/email/dialog-user.component';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(
    private matDialog: MatDialog
  ) { }



  OpenDialog(data: string): MatDialogRef<DialogComponent, any> {

    let matDialogConf = new MatDialogConfig();

    matDialogConf.data = data;
    matDialogConf.width='400px';
    matDialogConf.panelClass=['dialogConf']

    return this.matDialog.open(DialogComponent, matDialogConf)

  }


  OpenDialogUser(data: string): MatDialogRef<DialogUserComponent, any> {

    let matDialogConf = new MatDialogConfig();

    matDialogConf.data = data;
    matDialogConf.width='500px';
    matDialogConf.height='500px';
    matDialogConf.panelClass=['dialogConf']

    return this.matDialog.open(DialogUserComponent, matDialogConf)

  }


}
