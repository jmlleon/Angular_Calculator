import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType, ValidationType } from 'src/app/models/Calculator.model';
import { CalculatorFactory } from 'src/app/models/CalculatorFactory.model';
import { OperatorType } from 'src/app/models/Enum.model';


import { SnackBarService } from 'src/app/services/snackbar.service';
import { CustomValidatorsService } from 'src/app/services/validation.service';


@Component({
  selector: 'calculator-detail',
  templateUrl: './calculator-detail.component.html',
  styleUrls: ['./calculator-detail.component.css']
})
export class CalculatorDetailComponent implements OnInit {


  formGroup:FormGroup;
  //result:number=0;

  displayValue:string="";

  operators:string[]=["/","*","-","+"];
  currentOperator:string="";
  
  firstValue:string="";
  secondValue:string="";
  
  errorOp=false;

  //validationObject:ValidationType={} as ValidationType;

  constructor(
    private fb:FormBuilder,
    private snackBarSvc:SnackBarService,
    private customValidatorSvc:CustomValidatorsService   

  ) {

    this.formGroup=fb.group({
      "inputField":[""]//, [this.customValidatorSvc.calculatorValidator(this.validationObject)]
     }
    )

   }

  ngOnInit(): void {  
    
   // this.formGroup.get("inputField").valueChanges.subscribe(value=>{console.log("The only value "+value); });
  
  }

  get inputField(){return this.formGroup.get("inputField"); }

  //***A method to search operators and calculate***

  SearchOperator(){
   

    let index:number=0,operatorIndex=-1, maxIndexOperator=-1, minIndexOperator=-1;
    let backSubstring="",nextSubstring="";
    
    //this.errorOp=false;

    //Search Operators by Order
    while(index < this.operators.length){

     
      while(this.displayValue.indexOf(this.operators[index])>-1){

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

       var result=this.Calculate();     
       
       //if(this.errorOp){return;}
       
       //To Check Last Operation     

       this.displayValue=(maxIndexOperator!==-1 || minIndexOperator!==nextSubstring.length) ? backSubstring.substring(0,maxIndexOperator+1)+result.toString()+nextSubstring.substring(minIndexOperator) :result.toString();
       
      /* if(maxIndexOperator!==-1 || minIndexOperator!==nextSubstring.length){
         this.displayValue=backSubstring.substring(0,maxIndexOperator+1)+result.toString()+nextSubstring.substring(minIndexOperator); 
        }
        else{
        this.displayValue=result.toString();
       } */   
      

      }

      index++;      

    }    


  }


  FindMaxIndexOperator(backSubstring:string){

    //Try using find() and indexOf
    //backSubstring.search('/' || '*').lastIndexOf

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
    //this.result=0;
    this.displayValue="", this.currentOperator="",this.firstValue="",this.secondValue="";     
  }

}
