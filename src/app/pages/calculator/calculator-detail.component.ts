import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'calculator-detail',
  templateUrl: './calculator-detail.component.html',
  styleUrls: ['./calculator-detail.component.css']
})
export class CalculatorDetailComponent implements OnInit {


  formGroup:FormGroup;
  result:number=0;
  displayValue:string="";

  constructor(private fb:FormBuilder) {

    this.formGroup=fb.group({

      "main-input":[""]

    }
    )


   }

  ngOnInit(): void {
  }

  SetDisplay(value){

    this.displayValue=this.displayValue+value;

  }

  PutValue(value){

    this.formGroup.get("main-input").setValue(value);

    this.result=value;


  }

  Sum(value){

    this.formGroup.get("main-input").setValue(value);

  }

  Rest(value){

  }

  Divide(value){

  }


  Clear(){

    this.formGroup.get("main-input").setValue("");


  }

}
