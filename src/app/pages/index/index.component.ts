import { Component, OnInit } from '@angular/core';
import { CardData } from 'src/app/pages/index/card/card.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  cardArray:CardData[]= [

    {imgUrl:'assets/images/servicios3.jpg', category:'Servicios', title:'Nuestros Servicios',description:'Descripcion Nuestros Servicios'},
    {imgUrl:'assets/images/servicios4.jpg', category:'Productos', title:'Nuestros Productos',description:'Descripcion Acerca de Nuestros Productos'},
    {imgUrl:'assets/images/servicios4.jpg', category:'Nosotros', title:'Conocenos',description:'Descripcion Acerca de Nosotros'},
    {imgUrl:'assets/images/servicios4.jpg', category:'Nosotros', title:'Conocenos',description:'Descripcion Acerca de Nosotros'}

  ];  

  ngOnInit() {
    // C = (F − 32) × 5/9
    // F = C*9/5 + 32
  }

  
}
