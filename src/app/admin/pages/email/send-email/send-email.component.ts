import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthObject } from 'src/app/models/AuthObject.model';
import { Client } from 'src/app/models/client.model';
import { Email } from 'src/app/models/Email.model';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { EmailService } from 'src/app/services/email.service';
import { GapiService } from 'src/app/services/gapi.service';
import { RegisterService } from 'src/app/services/register.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

export type SendEmail=Omit<Email, "emailId" | "userName">;

type ClientChecked={
  checked:boolean,
  client:Client
}

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
})
export class SendEmailComponent implements OnInit {
  
  formGroup: FormGroup;
  message!: Email;

  viewType:string="";//new or old

  emailSelected!:Email;

  //clientList:Client[]=[];
  clientListLoading:boolean=true;sendingEmail:boolean=false;

  clientCheckedList:ClientChecked[]=[];

  allComplete: boolean = false;

  faUser=faUser;

  authObject!:AuthObject | null;

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(private fb: FormBuilder,
     private registerSvc:RegisterService,
      private authSvc:AuthService,
      private emailSvc:EmailService,
      private router:Router, 
      private dialogSvc:DialogService,
      private snackBarSvc: SnackBarService,
      private gapiSvc:GapiService,
      private activatedRoute:ActivatedRoute
      ) {
    this.formGroup = fb.group({
      
      subject: ['', Validators.required],
      body: ['', Validators.required]
     // userId: ['', Validators.required],
    });

    //Can be new or old(resend messages)
    this.activatedRoute.params.subscribe(params=>{this.viewType=params['type'];})

    this.authSvc.usuarioActual$.subscribe(response=>{

      this.authObject=response;

      //this.formGroup.get('userId')?.setValue=this.authObject

    })

    //console.log(`The view type is ${this.viewType}`);

    //For resend messages

    if(this.viewType==="old"){

      this.LoadResendData();   

  }
    //this.autosize.resizeToFitContent;

  }
  
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler($event: Event): void {

    if(this.viewType==="old")
    localStorage.setItem("emailSelected", JSON.stringify(this.emailSelected));

  }


  LoadResendData(){

    console.log(`Load resend data`);
    
    let mailFromStorage:Email=JSON.parse(localStorage.getItem("emailSelected")!);

    console.log(`Mail from storage ${mailFromStorage}`);

    if(mailFromStorage!==undefined && mailFromStorage!==null){

      this.emailSelected=mailFromStorage;

      localStorage.removeItem("emailSelected");

      this.LoadCheckedList();

    }else{

      this.emailSvc.emailSelected$.subscribe(response=>{

        this.emailSelected=response;
    
      // console.log(`Subscribe to email ${JSON.stringify(this.emailSelected)}`); 
      
      this.LoadCheckedList();
    
       })

    }    

  }

  LoadCheckedList(){

    this.clientCheckedList=this.emailSelected.recipients.map(c=><ClientChecked>{

      checked:true,
      client:c

  } )

    this.formGroup.get('subject')?.setValue(this.emailSelected.subject);
    this.formGroup.get('body')?.setValue(this.emailSelected.body);  

  }

  ngOnInit(): void {       

    //console.log(this.emailSelected);
    //Para Cuando se seleccione la Opcion Reenviar
    // if(this.emailSelected!==undefined ){

    //   console.log('entro aqui');      

    // }
   
  }

  async CallGapi(){

   //var a=await this.gapiSvc.fetchGoogleUser();

   var a=this.gapiSvc.initClient();
   //var a=await this.gapiSvc.loadGmailClient();
    //var a=await this.gapiSvc.checkForGmailLogin();
    //var a= this.gapiSvc.sendEmail();

    console.log(JSON.stringify(a));

  }

  get email() {
    return this.formGroup.controls;
  }

  

  LoadUser(){

let matDialogRef=this.dialogSvc.OpenDialogUser("Datos de Usuario");

matDialogRef.afterClosed().subscribe((response)=>{

  console.log(`La respuesta es: ${JSON.stringify(response)}`);

  if(response!=="Close"){

    this.clientCheckedList=response as ClientChecked[];

  }

})

}

  SendEmail() {


    if(this.clientCheckedList.filter(x=>x.checked).length === 0){this.snackBarSvc.OpenSnackBar({title:'Debe Seleccionar algun Usuario', type:'ERROR'}); return;}


    let matDialogRef=this.dialogSvc.OpenDialog("Desea Enviar el Correo Electronico");

    matDialogRef.afterClosed().subscribe(response=>{

      if(response==="Accept"){

        this.sendingEmail=true;

    var email:SendEmail={
      userId:1,
      subject:this.formGroup.get('subject')?.value,
      body:this.formGroup.get('body')?.value,
      recipients:this.clientCheckedList.filter(x=>x.checked).map(x=>x.client)
    }

   this.emailSvc.PostEmail(email).subscribe({

    next:(response)=>{},
    error:(error)=>{
      
      this.snackBarSvc.OpenSnackBar({title:'Ha Ocurrido un error al Enviar el Correo', type:'ERROR'})
      console.log(error); this.sendingEmail=false;
    
    },
    complete:()=>{
     
      this.sendingEmail=false;
      this.router.navigate(['/admin/email']);
      this.snackBarSvc.OpenSnackBar({title:'Se ha Enviado Correctamente el Correo', type:'OK'})
    
    }

   })

  }

    })
    
  }

  ClientChange(client:Client){

   let index= this.clientCheckedList.findIndex(c=>c.client.clientId===client.clientId)

   this.clientCheckedList[index].checked=!this.clientCheckedList[index].checked;

   this.updateAllComplete();

  }
 

  updateAllComplete() {
    this.allComplete =
      this.clientCheckedList != null &&
      this.clientCheckedList.every((t) => t.checked);
  }

  someComplete(): boolean {
    if (this.clientCheckedList == null) {
      return false;
    }
    return (
      this.clientCheckedList.filter((t) => t.checked).length > 0 &&
      !this.allComplete
    );
  }



  setAll(completed:boolean){

    this.allComplete = completed;
   
    if(this.clientCheckedList==null){return;}

    this.clientCheckedList.forEach((c)=>c.checked=completed);

  }

 
}
