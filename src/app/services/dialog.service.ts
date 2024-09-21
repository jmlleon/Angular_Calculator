import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../share/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  matDialog=inject(MatDialog);

  constructor() {}


  OpenDialog(data: string): MatDialogRef<DialogComponent, any> {

    let matDialogConf:MatDialogConfig ={
      data:data,
      width:'400px',
      panelClass:['dialogConf']
    };  

    return this.matDialog.open(DialogComponent, matDialogConf)

  }


}
