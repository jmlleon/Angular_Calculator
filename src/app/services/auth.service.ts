import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthObject } from '../models/AuthObject.model';
import { ChangePassword } from '../models/ChangePassword.model';
import { TokenModelo } from '../models/Token.model';
import { Usuario } from '../models/Usuario.model';
import { LoginData } from '../pages/login/login.component';
import { LocalStorageService } from './localstorage.service';
import { TokenService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private AppUrl='api/account/';
private httpHeaders!:HttpHeaders;

//Contiene el Usuario actualmente logueado
private authAObject:AuthObject | null;//nombre:"", apellidos:"", cargo:"",token:new TokenModelo("","")
private usuarioActualSubject: BehaviorSubject<AuthObject | null>;
usuarioActual$:Observable<AuthObject | null>;

constructor(  
private httpClient:HttpClient,
private route:Router, 
private tokenSvc:TokenService,
private lstSvc:LocalStorageService

) {  

  this.authAObject=this.lstSvc.getAuthObject();
  this.usuarioActualSubject=new BehaviorSubject<AuthObject | null>(this.authAObject);
  this.usuarioActual$=this.usuarioActualSubject.asObservable();  

  this.subcribeLocalStorage();

  // this.LoadjwtSubject();

}

//Cuando Ocurra un cambio en el LocalStorage

subcribeLocalStorage(){

  this.lstSvc.changeStorage$.subscribe(response=>{

    this.authAObject=this.lstSvc.getAuthObject();
    this.usuarioActualSubject.next(this.authAObject);

  })

}


get GetAuthObject(){
  
  // return this.authAObject;
  return this.lstSvc.getAuthObject();

}

set SetAuthObject(authObject:AuthObject){
// this.authAObject=authObject;
this.lstSvc.setAuthObject(this.authAObject);

}

// EmitCurrentUser(){
  
//   this.usuarioActualSubject.next(this.authAObject);

// }

// EmitCurrentUserNull(){

// this.usuarioActualSubject.next(null);

// }

//Retorna el Observable dle Token Service
isAuthenticated(){

  return this.tokenSvc.jwtAuth$;
  //return this.tokenService.comprobarToken();
  
}
  
  //Cierro session emito usuario null
  
  CerrarSession(){
  
    this.tokenSvc.RemoveToken();
    //this.usuarioActualSubject.next(null);  //{nombre:"",apellidos:"",cargo:""}
    this.route.navigate(["login"]);
  
  }

  
//Se subcribe a jwtSubject y emite null para behavior subject de authObject

// LoadjwtSubject(){

//   this.tokenSvc.jwtAuth$.subscribe(response=>{
  
//     if(!response){this.usuarioActualSubject.next(null);}
  
//   })
  
//   } 
  


AutenticarUsuario(loginData:LoginData){ 

  console.log("entro aqui");

return this.httpClient.post<AuthObject>(`${environment.ApiUrl}${this.AppUrl}login`, loginData, { headers: new HttpHeaders({"Content-Type": "application/json"})});


}

ChangeUserPassword(changePasswordData:ChangePassword){
  
  this.httpHeaders=new HttpHeaders().set("Authorization", "Bearer "+ this.tokenSvc.GetAccessToken());  
  
  return this.httpClient.put<Usuario>(`${environment.ApiUrl}${this.AppUrl}pass`, changePasswordData, {headers:this.httpHeaders});
  
  }




//Saber si el Usuario Logueado se encuentra dentro del Array de Perfiles

// isUserInProfile(perfil:Array<string>):boolean{  
 
// if(this.authAObject && perfil.find(x=>x===this.authAObject.cargo)){//

//   return true;
// }

// return false;

// }


}
