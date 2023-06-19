import { Component, Input, OnInit } from '@angular/core';

export class CardProduct{

  imgUrl:string;
  name:string;
  description:string;

  constructor(imgUrl:string, name:string, description:string){

    this.imgUrl=imgUrl;
    this.name=name;
    this.description=description;

  }

}

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {


  @Input() data:CardProduct={imgUrl:"", name:"", description:""};
  

  constructor() { }

  ngOnInit(): void {
  }

}
