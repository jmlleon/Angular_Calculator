import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SendEmail } from '../admin/pages/email/send-email/send-email.component';
import { AuthObject } from '../models/AuthObject.model';
import { Email } from '../models/Email.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

 
  AppUrl="/email";

  private emailSelected!:Email;
  emailSubject:BehaviorSubject<Email>;
  emailSelected$!:Observable<Email>;

  authObject!:AuthObject | null;

  headers!:HttpHeaders;

  constructor(private httpClient:HttpClient, private authSvc:AuthService) { 

    this.authSvc.usuarioActual$.subscribe(response=>{

      this.authObject=response;
      this.headers=new HttpHeaders().set("Authorization",`Bearer ${this.authObject !==null ? this.authObject.token.accessToken:''}`);

    })
   
    this.emailSubject=new BehaviorSubject<Email>(this.emailSelected);//
    this.emailSelected$=this.emailSubject.asObservable();

  }


  SendEmailSeleted(email:Email){

    this.emailSelected=email;
    this.emailSubject.next(email);

  }

////Hacer uso de GAPI*************************

  GetEmailList(){

return this.httpClient.get<Email[]>(`${environment.ApiUrl}${this.AppUrl}`, {headers:this.headers});


  }

  PostEmail(email:SendEmail){

    return this.httpClient.post<Email>(`${environment.ApiUrl}${this.AppUrl}`,email, {headers:this.headers});

  }

  GetEmailById(emailId:number){

    return this.httpClient.get<Email>(`${environment.ApiUrl}${this.AppUrl}/${emailId}`, {headers:this.headers});

  }


  RemoveEmail(emailId:number){

    return this.httpClient.delete<Email>(`${environment.ApiUrl}${this.AppUrl}/${emailId}`, {headers:this.headers});

  }

}
