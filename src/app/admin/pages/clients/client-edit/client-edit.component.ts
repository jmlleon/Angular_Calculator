import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faMailBulk, faSignIn, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Client, RegisterData } from 'src/app/models/client.model';
import { RegisterService } from 'src/app/services/register.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  formGroup: FormGroup;
  faUserCircle = faUserCircle; faEmail = faMailBulk; faLastName = faSignIn;

  registerLoading: boolean = false;

  clientSelected!:Client;

  clientId:number=-1;

  constructor(
    private registerSvc: RegisterService,
     private fb: FormBuilder,
     private snackBarSvc:SnackBarService,
     private activedRoute:ActivatedRoute,
     private router:Router
     ) {

    this.formGroup = this.fb.group({

      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.minLength(3), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]

    });


      //this.activedRoute.params.subscribe(params=>{this.clientId=params['id']; })

      this.activedRoute.queryParams.subscribe(params=>{this.clientId=params['id'];})

  }

  ngOnInit(): void {

    this.GetClientSelected();    

  }

  GetClientSelected(){


    this.registerSvc.getClientById(this.clientId).subscribe({

      next:(response)=>{this.clientSelected=response;},
      error:(error)=>{
      console.log(error);
      this.snackBarSvc.OpenSnackBar({title:'Ha Ocurrido un error al obtener el cliente', type:'ERROR'});
      },
      complete:()=>{

      this.formGroup.get("firstName")?.setValue(this.clientSelected.firstName),
      this.formGroup.get("lastName")?.setValue(this.clientSelected.lastName),
      this.formGroup.get("email")?.setValue(this.clientSelected.email)

      }

      })

  }

  get email(){

   return this.formGroup.get('email');

  }

  get f(){

    return this.formGroup.controls;
  }
  
  
  EditRegister() {

    this.registerLoading = true;

    const client:Client={
      clientId:this.clientSelected.clientId,
      firstName:this.formGroup.get("firstName")?.value,
      lastName:this.formGroup.get("lastName")?.value,
      email:this.formGroup.get("email")?.value 

    };

     //No se debe mostrar a cualquier usuario que existe un cliente con correo x registrado

    this.registerSvc.EditClient(client).subscribe({      
      // next:(response)=>{}, 
      error:(error)=>{
      //console.log(error);     
      this.snackBarSvc.OpenSnackBar({title:`${error.error}`, type:"ERROR"});
      this.registerLoading = false;    
    },
    complete:()=>{    
     this.snackBarSvc.OpenSnackBar({title:"Registro del Cliente Editado Correctamente", type:"OK"});
      this.registerLoading = false;

      this.router.navigate(['admin/clients']);

    }})

  }  

}
