import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthObject } from '../models/AuthObject.model';
import { TokenModelo } from '../models/Token.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
  authObject!: AuthObject | null;

  private changeStorageSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  public changeStorage$=this.changeStorageSubject.asObservable();

  constructor() {}

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler($event: Event): void {

  //   this.setAuthObject(this.authObject);

  // }

  
  getAuthObject() {
   
    var storeItem = localStorage.getItem('authObject');

    if (storeItem != null) {
      this.authObject = JSON.parse(storeItem);
    } else {
      this.authObject = {nombre:"", apellidos:"", cargo:"",token:new TokenModelo("","")};
    }

    return this.authObject;

  }

  setAuthObject(authObject:AuthObject | null){

    localStorage.setItem("authObject",JSON.stringify(authObject)); 
    this.changeStorageSubject.next(true);

  }

  Clear(){

    localStorage.removeItem("authObject");
    localStorage.clear();
    this.changeStorageSubject.next(true);

  }


}
