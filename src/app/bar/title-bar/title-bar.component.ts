import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  @Input() title:string="";
  @Input() info:string="Informacion del Modulo";

  constructor() { }

  ngOnInit(): void {
  }

}
