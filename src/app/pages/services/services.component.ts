import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ServiceCard } from './card/service-card.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  faCheck=faCheck;

  arrayServices:ServiceCard[]=[
    {
      imgUrl:'assets/images/servicios3.jpg',
      title:'Desarrollo de Software',
      content:'Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion',
      title2:'Lenguajes Utilizados'
    },

    {
      imgUrl:'assets/images/servicios4.jpg',
      title:'Desarrollo de Software',
      content:'Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion Nos dedicamos al Desarrollo de Software Empleando diferentes lenguajes de Programacion',
      title2:'Lenguajes Utilizados'
    },


];

  /* */

  constructor() { }

  ngOnInit(): void {
  }

}
