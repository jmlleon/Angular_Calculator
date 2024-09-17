import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonType } from 'src/app/models/Calculator.model';
import { CalculatorFactory } from 'src/app/models/CalculatorFactory.model';
import { CalculatorType } from 'src/app/models/Enum.model';
import { ICalculator } from 'src/app/models/Interfaces/ICalculator.model';

import { SnackBarService } from 'src/app/services/snackbar.service';
import { CustomValidators } from 'src/app/share/validation/validation.directive';


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
  firstValue:string="";
  secondValue:string="";
  
  errorOp=false;

  buttonType:ButtonType;

  constructor(
    private fb:FormBuilder,
    private snackBarSvc:SnackBarService   

  ) {

    this.formGroup=fb.group({

      "inputField":["", [CustomValidators.calculatorValidator()]]//Validators.pattern()

     }
    )

   }

  ngOnInit(): void {   

  }

  get inputField(){

    return this.formGroup.get("inputField");

  }

  //***A method to search operators and calculate***

  SearchOperator(){
   

    let index:number=0,operatorIndex=-1, maxIndexOperator=-1, minIndexOperator=-1;
    let backSubstring="",nextSubstring="";
    this.errorOp=false;

    //Search Operators by Order
    while(index < this.operators.length){

     
      while(this.displayValue.indexOf(this.operators[index])>-1){

       operatorIndex=this.displayValue.indexOf(this.operators[index]);       
       
       backSubstring=this.displayValue.substring(0,operatorIndex);
       nextSubstring=this.displayValue.substring(operatorIndex+1);

       maxIndexOperator=-1;
       minIndexOperator=nextSubstring.length;      

       this.operators.forEach(op=>{maxIndexOperator=backSubstring.lastIndexOf(op)>maxIndexOperator?backSubstring.lastIndexOf(op):maxIndexOperator;});  
       
       this.operators.forEach(op=>{minIndexOperator=nextSubstring.indexOf(op)<minIndexOperator && nextSubstring.indexOf(op) > -1 ?nextSubstring.indexOf(op):minIndexOperator;});

       this.currentOperator=this.operators[index];
       this.firstValue=backSubstring.substring(maxIndexOperator+1);
       this.secondValue=nextSubstring.substring(0, minIndexOperator);     

       this.Calculate();     
       
       if(this.errorOp){return;}
       
       //To Check Last Operation
       if(maxIndexOperator!==-1 || minIndexOperator!==nextSubstring.length){
         this.displayValue=backSubstring.substring(0,maxIndexOperator+1)+this.result.toString()+nextSubstring.substring(minIndexOperator); 
        }
        else{
        this.displayValue=this.result.toString();
       }

       
      /*console.log('Operator Index '+operatorIndex);
      console.log('Min index operator initial '+minIndexOperator)
      console.log('Max index operator '+op+'index '+maxIndexOperator);
      console.log('Min index operator '+op+'index '+minIndexOperator);

      console.log('Back substring '+backSubstring);
      console.log('Next substring '+nextSubstring);
      console.log('Operator is '+this.operators[index]);
      console.log(this.displayValue);
      console.log('Index is '+index);*/
       

      }

      index++;
      

    }    


  }

  SetDisplay(value:ButtonType){
    
    if(this.ValidateInput(value.buttonValue, value.isOperator)){

      this.displayValue=this.displayValue+value.buttonValue;     

    }   

  }

  
  //Validate Input
  ValidateInput(inputValue, isOperator:boolean){

    //For Operators
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
      
      if(inputValue==="="){

        //Search Operators and Calculate

        this.SearchOperator();
        return false;
       }      
      
      if(inputValue==="CLEAR"){
          this.Clear();
          return false;

      }       
      

    }

    return true;

  }



  //Search the operators order and priority and get result
  
  Calculate(){

    var calculatorFactory=new CalculatorFactory();

    var ICalculatorType=calculatorFactory.getCalculatorType(this.currentOperator);

    this.result=ICalculatorType.Calculate(this.firstValue, this.secondValue);  

    //Check division under cero

    
    
    /*switch(this.currentOperator){

      case "+":

      this.Sum();

      break;

      case "-":

      this.Rest();

      break;

      case "*":

      this.Multi();

      break;

      default:

      this.Divide()

      break;

    } */   

  }


 /* Sum(){this.result=Number(this.firstValue)+Number(this.secondValue); }

  Rest(){this.result=Number(this.firstValue)-Number(this.secondValue);}

  Multi(){this.result=Number(this.firstValue) * Number(this.secondValue); }

  Divide(){

    if(Number(this.secondValue)===0){
      this.snackBarSvc.OpenSnackBar({title:"Div under cero not allowed", type:"ERROR"});
      this.errorOp=true;
      this.Clear();
    }else{
      this.result=Number(this.firstValue) / Number(this.secondValue);
    }        
  
  }*/


  Clear(){       
    this.result=0;
    this.displayValue="", this.currentOperator="",this.firstValue="",this.secondValue="";     
  }


}
