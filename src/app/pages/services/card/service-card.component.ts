import { Component, Input, OnInit } from '@angular/core';

export class ServiceCard{

imgUrl:string="";
title:string="";
content:string="";
title2:string="";

}

@Component({
  selector: 'service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {

  @Input() card:ServiceCard={   
    imgUrl:'',
    content:'',
    title:'',
    title2:''   
  };;

  constructor() { }

  ngOnInit(): void {
  }

}
