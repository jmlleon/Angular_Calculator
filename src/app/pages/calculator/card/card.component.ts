import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { ButtonCard, ButtonType } from 'src/app/models/Calculator.model';
import { BarService } from 'src/app/services/bar.service';


@Component({
  selector: 'calculator-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CalculatorCardComponent implements OnInit, OnChanges {

  bgModeValue:string="";

  data:ButtonCard[]=[
  {style:'flex items-center justify-center border border-slate-300 border-solid px-2',buttonStyle:"w-full h-[80%]",buttonValue:"/" ,isOperator:true},  
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"*" ,buttonStyle:"w-full h-[80%]",isOperator:true},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"-" ,buttonStyle:"w-full h-[80%]",isOperator:true},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"=" ,buttonStyle:"w-full h-[80%]",isOperator:true},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"7" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"8" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"9" ,buttonStyle:"w-full h-[80%]",isOperator:false},  
  {style:"flex items-center justify-center border border-slate-300 border-solid row-span-2 p-2",buttonValue:"+" ,buttonStyle:"w-full h-full",isOperator:true},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"4" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"5" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"6" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"1" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"2" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"3" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid p-2 row-span-2",buttonValue:"CLEAR" ,buttonStyle:"w-full h-full",isOperator:true},
  {style:"flex items-center justify-center border border-slate-300 border-solid col-span-2 px-2",buttonValue:"0" ,buttonStyle:"w-full h-[80%]",isOperator:false},
  {style:"flex items-center justify-center border border-slate-300 border-solid px-2",buttonValue:"." ,buttonStyle:"w-full h-[80%]",isOperator:false}
  ];

  @Output() buttonEmitter=new EventEmitter<ButtonType>();

  constructor(private barSvc:BarService) { }

  ngOnInit(): void {

    this.setBgMode();
  }

  setBgMode(){
    this.barSvc.bgMode$.subscribe(mode=>{
      this.bgModeValue=mode;
    })
  }

  ngOnChanges(){
    
  }

  SetDisplay(value:string, isOperator:boolean){    
    this.buttonEmitter.emit({buttonValue:value,isOperator:isOperator});
  }

}
