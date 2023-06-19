import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

type RegisterData=Omit<Client,"clientId">;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  
  appUrl: string = "/client";

  httpHeaders!: HttpHeaders;

  constructor(private httpClient: HttpClient) { }



  registerClient(client: RegisterData) {

    return this.httpClient.post<Client>(`${environment.ApiUrl}${this.appUrl}`, client);

  }

  EditClient(client:Client){

    return this.httpClient.put<Client>(`${environment.ApiUrl}${this.appUrl}/${client.clientId}`, client);

  }

  getClientList() {

    return this.httpClient.get<Client[]>(`${environment.ApiUrl}${this.appUrl}`);

  }

  getClientById(clientId:number) {

    return this.httpClient.get<Client>(`${environment.ApiUrl}${this.appUrl}/${clientId}`);

  }

  removeClient(clientId:number){

    return this.httpClient.delete<Client>(`${environment.ApiUrl}${this.appUrl}/${clientId}`)

  }


}
