import { Client } from "./client.model";
import { Usuario } from "./Usuario.model";

export class Email{
  
    emailId!:number;
    subject:string="";
    recipients:Client[]=[];
    body:string="";
    userId!:number;
    userName!:string;

  }  