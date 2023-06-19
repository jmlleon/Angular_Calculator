import { Component, OnInit } from '@angular/core';
import { CardProduct } from './card/product-card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productArray:CardProduct[]=[

{
  imgUrl:'assets/images/servicios3.jpg',
  name:"EMMOBOCKS .SOL",
  description:' Descripcion del Producto Descripcion del Producto Descripcion del Producto Descripcion del Producto Descripcion del Producto Descripcion del Producto Descripcion del Producto'
},
{
  imgUrl:'assets/images/servicios3.jpg',
  name:"RAISENLT .SOL",
  description:' Descripcion del Producto Descripcion del Producto Descripcion del Producto Descripcion del Producto Descripcion del Producto Descripcion del Producto Descripcion del Producto'

}

];

  constructor() { }

  ngOnInit(): void {
  }

}
