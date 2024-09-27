import { Component, EventEmitter, Input, OnInit, Output,  inject } from '@angular/core';
import { ButtonCard, ButtonType } from 'src/app/models/Calculator.model';
import { BarService } from 'src/app/services/bar.service';


@Component({
  selector: 'calculator-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'], 
})
export class CalculatorCardComponent implements OnInit {

  bgModeValue:string="";

  @Input() focusValue:string="";

  communStyle:string[]=[
    'flex items-center justify-center border border-slate-300 border-solid px-2 ',
    'flex items-center justify-center border border-slate-300 border-solid p-2 row-span-2'];

  data:ButtonCard[]=[
  {style:this.communStyle[0],buttonStyle:"w-full h-[80%]",buttonValue:"/" ,isOperator:true}, 
  {style:this.communStyle[0],buttonValue:"*" ,buttonStyle:"w-full h-[80%]",isOperator:true},  
  {style:this.communStyle[0],buttonValue:"-" ,buttonStyle:"w-full h-[80%]",isOperator:true},
  {style:this.communStyle[0],buttonValue:"=" ,buttonStyle:"w-full h-[80%]",isOperator:true},
  {style:this.communStyle[0],buttonValue:"7" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[0],buttonValue:"8" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[0],buttonValue:"9" ,buttonStyle:"w-full h-[80%]",isOperator:false},  
  {style:this.communStyle[1],buttonValue:"+" ,buttonStyle:"w-full h-full",isOperator:true},
  {style:this.communStyle[0],buttonValue:"4" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[0],buttonValue:"5" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[0],buttonValue:"6" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[0],buttonValue:"1" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[0],buttonValue:"2" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[0],buttonValue:"3" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[1],buttonValue:"CLEAR" ,buttonStyle:"w-full h-full",isOperator:true},
  {style:`${this.communStyle[0]} col-span-2`,buttonValue:"0" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:this.communStyle[0],buttonValue:"." ,buttonStyle:"w-full h-[80%]",isOperator:false}
  ];


  @Output() buttonEmitter=new EventEmitter<ButtonType>();

  barSvc=inject(BarService);

  constructor() { }

  ngOnInit(): void {
    this.setBgMode();
  }

  setBgMode(){
    this.barSvc.bgMode$.subscribe(mode=>{
      this.bgModeValue=mode;
    })
  } 

  SetDisplay(value:string, isOperator:boolean){    
    this.buttonEmitter.emit({buttonValue:value,isOperator:isOperator});
  }

}
