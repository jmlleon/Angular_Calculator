import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'calculator-detail',
  templateUrl: './calculator-detail.component.html',
  styleUrls: ['./calculator-detail.component.css']
})
export class CalculatorDetailComponent implements OnInit {


  formGroup:FormGroup;
  result:number=0;

  displayValue:string="";

  operators:string[]=["/","*","-","+"];

  currentOperator:string="";

  currentValue:number=0;


  constructor(
    private fb:FormBuilder,
    private snackBarSvc:SnackBarService

  ) {

    this.formGroup=fb.group({

      "main-input":["", ]//Validators.pattern()

    }

    )

   }

  ngOnInit(): void {


  }

  SetDisplay(value, isOperator:boolean){

    if(this.ValidateInput(value, isOperator)){

      this.displayValue=this.displayValue+value;     
      
      if(!isOperator){

         //If is the second value

         console.log("Not Operator");

         //var element=this.displayValue.charAt(this.displayValue.length-2);

         //console.log(element);

        if(this.operators.includes(this.displayValue.charAt(this.displayValue.length-2))){

          console.log("Calculate now");

          this.Calculate(value);
            
        }else{

          //If is the first value
          console.log("If is the first value");
          this.currentValue=value;
        }     
      
      }else{

        console.log("Is Operator");

        this.currentOperator=value;        

      }      

    }   

  }

  //Search the operators order and priority and get result
  
  Calculate(value){

    switch(this.currentOperator){

      case "+":

      this.result=Number(this.currentValue)+Number(value);
      this.displayValue=this.result.toString();

      break;

      case "-":

      this.result=Number(this.currentValue)-Number(value);
      this.displayValue=this.result.toString();

      break;

      default:

    }
    

  }

  ValidateInput(inputValue, isOperator:boolean){

  
    if(isOperator){

      //The First Value Cannt be a operator

      if(this.displayValue.length===0){

        this.snackBarSvc.OpenSnackBar({title:"The First Value Cannt be a operator", type:"ERROR"});

        return false;

      }

      //Avoid two operators sequence

      if(this.operators.includes(this.displayValue.charAt(this.displayValue.length-1))){

        this.snackBarSvc.OpenSnackBar({title:"Two or more squence operator not allowed", type:"ERROR"});

        return false;

      }     

    }

    return true;

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
    this.result=0;
    this.currentValue=0;
    this.displayValue="";
    this.currentOperator="";


  }



}
