import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { faTrash, faEdit, faUser, faEye } from '@fortawesome/free-solid-svg-icons';
import { Client } from 'src/app/models/client.model';
import { Email } from 'src/app/models/Email.model';
import { Usuario } from 'src/app/models/Usuario.model';
import { DialogService } from 'src/app/services/dialog.service';
import { EmailService } from 'src/app/services/email.service';
import { SnackBarService } from 'src/app/services/snackbar.service';

// type Email={
//   subject:string,
//   recipients:Client[],
//   body:string
// }

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
})
export class EmailComponent implements OnInit {
  
  emailLoading = true;  
  emailList:Email[]=[];

  displayedColumnsHeader:string[]=['actions','emailId', 'subject', 'body','clients', 'userId'];
  displayedColumns:string[]=['view','edit', 'delete', 'emailId','subject', 'body','clients', 'userId'];

  dataSource=new MatTableDataSource<Email>();

  faTrash=faTrash;faEdit=faEdit;faUser=faUser;faEye=faEye;

  constructor(private emailSvc:EmailService,
    private dialogSvc:DialogService,
    private snackBarSvc:SnackBarService,
    private router:Router
    ) {}

  ngOnInit(): void {

    this.getSendEmail();

  }

  getSendEmail() {

    this.emailSvc.GetEmailList().subscribe({

      next:(response)=>{

        this.emailList=response;
      },
      error:(error)=>{console.log(error);},
      complete:()=>{

        this.dataSource.data=this.emailList;
        this.emailLoading = false;

      }

    })  
    

  }

  Recipients(email:Email){

    console.log(JSON.stringify(email.recipients))

    return email.recipients.map(x=>x.firstName).toString();

  }

  View(email:Email){


  }

  Resend(email:Email){

    this.emailSvc.SendEmailSeleted(email);
    this.router.navigate(["/admin/sendemail/old"]);

  }

  Delete(email:Email){

    let matDialogRef=this.dialogSvc.OpenDialog(`Desea Eliminar el Correo con Asunto: '${email.subject}'?`);

    matDialogRef.afterClosed().subscribe(response=>{


      if(response==="Accept"){


        this.emailSvc.RemoveEmail(email.emailId).subscribe({

          next:(response)=>{},
          error:(error)=>{console.log(error)},
          complete:()=>{
            
            this.snackBarSvc.OpenSnackBar({title:'Se ha Eliminado Correctamente el Correo', type:'OK'});

            this.getSendEmail();
          
          }

        })

      }


    })

  }
}
