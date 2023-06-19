import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from 'src/app/models/client.model';
import { RegisterService } from 'src/app/services/register.service';

import { faSearch, faUser, faCheckDouble } from '@fortawesome/free-solid-svg-icons';


type ClientChecked={

  checked:boolean,
  client:Client

}

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {
  
description:string;

clientCheckedList:ClientChecked[]=[];

clientListAux:ClientChecked[]=[];

allComplete: boolean = false;

faSearch=faSearch;faUser=faUser;faCheck=faCheckDouble;

clientList:Client[]=[];

clientListLoading:boolean=true;

formGroup:FormGroup;

constructor(
public dialogRef:MatDialogRef<DialogUserComponent>,
@Inject(MAT_DIALOG_DATA) public data:any,
private registerSvc:RegisterService,
private fb:FormBuilder

) { 

  this.description=data;  
  
  this.formGroup=fb.group({

    search:[""]
})

this.formGroup.get("search")?.valueChanges.subscribe((value)=>{

  this.SearchUser(value);

})

}

  ngOnInit(): void {

    this.GetClientList();
  }


  GetClientList(){

this.registerSvc.getClientList().subscribe({

  next:(response)=>{this.clientList=response;},
  error:(error)=>{console.log(error)},
  complete:()=>{

   // this.clientListAux=[...this.clientList];

    this.clientList.forEach((c)=>{

      this.clientCheckedList.push({checked:false, client:c});

    })
    
    this.clientListAux=[...this.clientCheckedList];

      this.clientListLoading=false;

  }


})

  }


  // FillCheckedList(){

  //   this.clientCheckedList=[];    

  //   console.log(`The Client Checked List is ${this.clientCheckedList}`);

  // }


  ClientChange(client:Client){

    let index= this.clientListAux.findIndex(c=>c.client.clientId===client.clientId)
 
    this.clientListAux[index].checked=!this.clientListAux[index].checked;

    //this.clientListAux[index].checked=!this.clientListAux[index].checked;
 
    this.updateAllComplete();
 
   }
  
 
   updateAllComplete() {
     this.allComplete =
       this.clientListAux != null &&
       this.clientListAux.every((t) => t.checked);
   }
 
   someComplete(): boolean {
     if (this.clientListAux == null) {
       return false;
     }
     return (
       this.clientListAux.filter((t) => t.checked).length > 0 &&
       !this.allComplete
     );
   }
 
   setAll(){//completed:boolean 
 
     this.allComplete = !this.allComplete;
    
     if(this.clientListAux==null){return;}
 
     this.clientListAux.forEach((c)=>c.checked=this.allComplete);
 
   }


  
  Acept(){

    let listChecked=this.clientListAux.filter(c=>c.checked);

    this.dialogRef.close(listChecked);
  }

  Close(){

    this.dialogRef.close("Close");

  }

  SearchUser(searchValue:string){

    //let searchValue=this.formGroup.get("search")?.value.trim().toLowerCase();

    this.clientListAux=this.clientCheckedList.filter(c=>c.client.firstName.toLocaleLowerCase().indexOf(searchValue)> -1);
   

  }


}
