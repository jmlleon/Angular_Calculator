import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faInfo, faMailBulk, faSignIn, faUserCircle, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import {  RegisterData } from 'src/app/models/client.model';
import { RegisterService } from 'src/app/services/register.service';
import { SnackBarService } from 'src/app/services/snackbar.service';





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  faUserCircle = faUserCircle; faEmail = faMailBulk; faLastName = faSignIn;

  registerLoading: boolean = false;

  constructor(
    private registerSvc: RegisterService,
     private fb: FormBuilder,
     private snackBarSvc:SnackBarService
     ) {

    this.formGroup = this.fb.group({

      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]

    });


  }

  ngOnInit(): void {


  }

  get email(){

   return this.formGroup.get('email');

  }

  get f(){

    return this.formGroup.controls;
  }
  
  
  Register() {

    this.registerLoading = true;

    const client:RegisterData={
      firstName:this.formGroup.get("firstName")?.value,
      lastName:this.formGroup.get("lastName")?.value,
      email:this.formGroup.get("email")?.value

    };

    // console.log(JSON.stringify(data));

    //No se debe mostrar a cualquier usuario que existe un cliente con correo x registrado

    this.registerSvc.registerClient(client).subscribe({
      
      // next:(response)=>{}, 
      error:(error)=>{
      //console.log(error);
      //this.OpenSnackBar(`${error.error}`,"OK");
      this.snackBarSvc.OpenSnackBar({title:`${error.error}`, type:"ERROR"});
      this.registerLoading = false;    
    },
    complete:()=>{

     // this.OpenSnackBar("Cliente registrado Correctamente", "OK");
     this.snackBarSvc.OpenSnackBar({title:"Cliente registrado Correctamente", type:"OK"});
      this.registerLoading = false;

    }})

  }


  


}
