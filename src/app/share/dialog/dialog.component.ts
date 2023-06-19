import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

description:string;

  constructor(
  public dialogRef:MatDialogRef<DialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any
  ) { 

    this.description=data;    

  }

  ngOnInit(): void {

    this.dialogRef.updateSize('500px', '220px');
    
  }


  Acept(){

    this.dialogRef.close("Accept")
  }

  Close(){

    this.dialogRef.close("Close");

  }

}
