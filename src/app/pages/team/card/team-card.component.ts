import { Component, Input, OnInit } from '@angular/core';

export class TeamMember{

  avatar:string="";
  name:string="";
  email:string="";
  content:string="";

  constructor(avatar:string,name:string,email:string, content:string){

    this.avatar=avatar;
    this.name=name;
    this.email=email;
    this.content=content;

  }  

}

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent implements OnInit {

  @Input() member:TeamMember={avatar:"",name:"",email:"",content:""};

  constructor() { }

  ngOnInit(): void {
  }

}
