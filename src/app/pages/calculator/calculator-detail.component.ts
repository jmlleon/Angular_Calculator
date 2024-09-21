import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, ValidationType } from 'src/app/models/Calculator.model';
import { CalculatorFactory } from 'src/app/models/CalculatorFactory.model';
import { OperatorType } from 'src/app/models/Enum.model';

import { CustomValidatorsService } from 'src/app/services/validation.service';


@Component({
  selector: 'calculator-detail',
  templateUrl: './calculator-detail.component.html',
  styleUrls: ['./calculator-detail.component.css']
})
export class CalculatorDetailComponent implements OnInit {


  formGroup:FormGroup;  

  displayValue:string="";

  operators:string[]=["/","*","-","+"];
  currentOperator:string="";
  
  firstValue:string="";
  secondValue:string=""; 


  customValidatorSvc=inject(CustomValidatorsService);
  fb=inject(FormBuilder);

  constructor() {

    this.formGroup=this.fb.group({
      "inputField":[""]
     }
    )

   }

  ngOnInit(): void {  
  
  
  }

  get inputField(){return this.formGroup.get("inputField"); }

  //***A method to search operators and calculate***

  SearchOperator(){
   

    let index:number=0,operatorIndex=-1, maxIndexOperator=-1, minIndexOperator=-1;
    let backSubstring="",nextSubstring="";   
   

    //Search Operators by Order
    while(index < this.operators.length){

      let repeatCount=this.FindOperatorCount(this.displayValue,this.operators[index]);     
      
      while(repeatCount>0){

       operatorIndex=this.displayValue.indexOf(this.operators[index]);       
       
       backSubstring=this.displayValue.substring(0,operatorIndex);
       nextSubstring=this.displayValue.substring(operatorIndex+1);

       maxIndexOperator=-1;
       minIndexOperator=nextSubstring.length;   
       
       
       //Find Max Index Operator

       maxIndexOperator=this.FindMaxIndexOperator(backSubstring);

       //Find Min Index Operator

       minIndexOperator=this.FindMinIndexOperator(nextSubstring);
     
       this.currentOperator=this.operators[index];
       
       this.firstValue=backSubstring.substring(maxIndexOperator+1);
       this.secondValue=nextSubstring.substring(0, minIndexOperator);
       
       console.log(`first value ${this.firstValue} secondavalue ${this.secondValue}`);

       var result=this.Calculate();       
         
       //To Check Last Operation     

       this.displayValue=(maxIndexOperator!==-1 || minIndexOperator!==nextSubstring.length) ? backSubstring.substring(0,maxIndexOperator+1)+result.toString()+nextSubstring.substring(minIndexOperator) :result.toString();
       
        repeatCount--;

      }

      index++;      

    }  
  
  }

  FindOperatorCount(displayValue:string, operator:string){

    let repeatNumber=0, pos=0;    

      while(displayValue.indexOf(operator,pos)>-1){
        repeatNumber++;
        pos=displayValue.indexOf(operator,pos);      
        pos++;       
      } 

      return repeatNumber;    
  }


  FindMaxIndexOperator(backSubstring:string){   

    let maxIndexOperator=-1;

    this.operators.forEach(op=>{    
        
        maxIndexOperator=backSubstring.lastIndexOf(op)>maxIndexOperator?backSubstring.lastIndexOf(op):maxIndexOperator;      
         
    }); 
    
    return maxIndexOperator;

  }

  FindMinIndexOperator(nextSubstring:string){

    let minIndexOperator=nextSubstring.length;

    this.operators.forEach(op=>{
      minIndexOperator=nextSubstring.indexOf(op)<minIndexOperator && nextSubstring.indexOf(op) > -1 ? nextSubstring.indexOf(op):minIndexOperator;
    
    });

    return minIndexOperator;

  }



  SetDisplay(value:ButtonType){

    this.SetValidator(value);
    
    if(this.IsNotOperation(value) && !this.formGroup.get('inputField').hasError('validationError')){

      this.displayValue=this.displayValue+value.buttonValue;           

    }   

  }

  SetValidator(value:ButtonType){

    var validationObject:ValidationType={buttonValue:value.buttonValue,isOperator:value.isOperator,displayValue:this.displayValue};

    this.formGroup.get('inputField').setValidators([this.customValidatorSvc.calculatorValidator(validationObject)]);
    this.formGroup.get('inputField').updateValueAndValidity();     

  }
  
  //Check is Operation
  IsNotOperation(value:ButtonType){

    //For Operators check validation error
    if(value.isOperator){      
      
      if(value.buttonValue===OperatorType.equal){
        //Search Operators and Calculate
        this.SearchOperator();
        return false;
       }      
      
      if(value.buttonValue===OperatorType.clear){
          this.Clear();
          return false;
      }           

    }

    return true;
  }



  //Search the operators order and priority and get result
  
  Calculate(){

    var calculatorFactory=new CalculatorFactory();

    var iCalculatorType=calculatorFactory.getCalculatorType(this.currentOperator);

    return iCalculatorType.Calculate(this.firstValue, this.secondValue);    

  }
  

  Clear(){     
    this.displayValue="", this.currentOperator="",this.firstValue="",this.secondValue="";     
  }

}
