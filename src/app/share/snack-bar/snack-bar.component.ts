import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

type SnackBarData={

title:string,
type:string

}

@Component({
  selector: 'snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  cssColor:string="";

  constructor(
    public sbRef:MatSnackBarRef<SnackBarComponent>,
     @Inject(MAT_SNACK_BAR_DATA) public data:SnackBarData
     ) { }

  ngOnInit(): void {

   if(this.data.type==="OK"){

    this.cssColor="bg-green-500";

   }else{

    this.cssColor="bg-red-600";

   }


  }


  Close(){

  this.sbRef.dismiss();

  }

  afterDismissed(){

    this.sbRef.afterDismissed().subscribe(()=>{

      console.log("Dismissed");
    })
  }

  onAction(){

    this.sbRef.onAction().subscribe(()=>{

      console.log("OnAction");
    })

  }

}
