import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import { SnackBarData } from 'src/app/models/Calculator.model';



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
   this.cssColor=this.data.type==="OK" ? "bg-green-500":"bg-red-600";
  }


  Close=()=> this.sbRef.dismiss();
  

}
