import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthObject } from '../models/AuthObject.model';
import { UserData, Usuario } from '../models/Usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
 
  appUrl: string = '/usuario';

  authObject!:AuthObject | null;
  httpHeaders!: HttpHeaders;

  user!:Usuario;
  userSubject!:BehaviorSubject<Usuario>;
  user$!:Observable<Usuario>;

  constructor(private httpClient: HttpClient, private authSvc:AuthService) {
    
    this.authSvc.usuarioActual$.subscribe(authObj => {

      this.authObject = authObj !== null ? authObj : null;//{ nombre: '', apellidos: '', cargo: '', token: { accessToken: '', refreshToken: '' }}

      this.httpHeaders = new HttpHeaders().set("Authorization", "Bearer " + this.authObject!==null ? this.authObject!.token.accessToken:"");


    });

    this.userSubject=new BehaviorSubject<Usuario>(this.user);
    this.user$=this.userSubject.asObservable();

  }

  SetUser(user:Usuario){

    this.user=user;
    this.userSubject.next(user);


  }

  GetUserList() {
    return this.httpClient.get<Usuario[]>(`${environment.ApiUrl}${this.appUrl}`, {headers:this.httpHeaders});
  }


  GetUserById(userId:number){

    return this.httpClient.get<Usuario>(`${environment.ApiUrl}${this.appUrl}/${userId}`, {headers:this.httpHeaders});

  }
 

  AddUser(userData:UserData){

    return this.httpClient.post<Usuario>(`${environment.ApiUrl}${this.appUrl}`, userData, {headers:this.httpHeaders});
    
  }

  EditUser(user:Usuario){

    return this.httpClient.put<Usuario>(`${environment.ApiUrl}${this.appUrl}/${user.idUsuario}`,user, {headers:this.httpHeaders});

  }

  RemoveUser(userId:number){

    return this.httpClient.delete(`${environment.ApiUrl}${this.appUrl}/${userId}`,{headers:this.httpHeaders});

  }

}
