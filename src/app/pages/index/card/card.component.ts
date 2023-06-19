import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

export class CardData{

  imgUrl:string="";
  category:string="";
  title:string="";
  description:string="";

  constructor(imgUrl:string, category:string, title:string, description:string){

    this.imgUrl=imgUrl;
    this.category=category;
    this.title=title;
    this.description=description;

  }

}

@Component({
  selector: 'card-item',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() data:CardData=new CardData("","","","");

  constructor() { 

  }

  ngOnInit(): void {
  }

}
