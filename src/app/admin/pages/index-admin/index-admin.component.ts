import { Component, OnInit } from '@angular/core';
import { faStore, faUsers, IconDefinition, faMailBulk } from '@fortawesome/free-solid-svg-icons';

type ModuleData={

title:string,
icon:IconDefinition,
link:string

}

@Component({
  selector: 'index-admin',
  templateUrl: './index-admin.component.html',
  styleUrls: ['./index-admin.component.css']
})
export class IndexAdminComponent implements OnInit {

  faUsers=faUsers;faStore=faStore;faEmail=faMailBulk;

moduleArray:ModuleData[]=[
  {icon:this.faUsers, title:'Usuarios', link:'users'},
  {icon:this.faUsers, title:'Clientes', link:'clients'},
  {icon:this.faStore, title:'Trazas', link:'users'},
  {icon:this.faEmail, title:'Email', link:'email'},
];



  constructor() { }

  ngOnInit(): void {
  }

}
