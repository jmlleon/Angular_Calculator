import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../share/snack-bar/snack-bar.component';


type SnackBarData={

  title:string,
  type:string
  
  }

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar:MatSnackBar
  ) { }


  OpenSnackBarTest(content:string, action:string) {

    let snb = this.snackBar.open(content, action, { duration: 5000, panelClass:['snackBar-green'] });//validateVerticalPosition, horizontalPosition

    snb.onAction().subscribe(() => {

      snb.dismiss();
    });

  }

  OpenSnackBar(data: SnackBarData) {

    let snb = this.snackBar.openFromComponent(SnackBarComponent, { data: data, panelClass:['snackBar'] })//duration: 5000 

    snb.afterDismissed().subscribe(() => {

      console.log("cerrado");
      //snb.dismiss();
    })


  }


}
