import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../share/snack-bar/snack-bar.component';
import { SnackBarData } from '../models/Calculator.model';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  snackBar=inject(MatSnackBar);

  constructor() {}
 

  OpenSnackBar(data: SnackBarData) {

     this.snackBar.openFromComponent(SnackBarComponent, { data: data, duration: 5000, panelClass:['snackBar']});
    //snb.afterDismissed().subscribe(() => { console.log("dismiss")});

  }

  OpenSnackBarTest(content:string, action:string) {

    this.snackBar.open(content, action, { duration: 5000, panelClass:['snackBar-green'] });
    //snb.onAction().subscribe(() => {snb.dismiss();});

  }


}
