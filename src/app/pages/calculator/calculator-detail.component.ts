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
  firstValue:string="";
  secondValue:string="";
  
  errorOp=false;

  constructor(
    private fb:FormBuilder,
    private snackBarSvc:SnackBarService   

  ) {

    this.formGroup=fb.group({

      "main-input":[""]//Validators.pattern()

     }
    )

   }

  ngOnInit(): void {   

  }

  

  //***A method to search operators and calculate***

  SearchOperator(){

    let index:number=0;
    this.errorOp=false;

    while(index < this.operators.length){

     
      while(this.displayValue.indexOf(this.operators[index])>-1){


       let operatorIndex=this.displayValue.indexOf(this.operators[index]);       
       
       let backSubstring=this.displayValue.substring(0,operatorIndex);

       let nextSubstring=this.displayValue.substring(operatorIndex+1);

       let maxIndexOperator=-1;

       let minIndexOperator=nextSubstring.length;      

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

  SetDisplay(value){
    
    if(this.ValidateInput(value.buttonValue, value.isOperator)){

      this.displayValue=this.displayValue+value.buttonValue;     

    }   

  }

  
  //Validate Input
  ValidateInput(inputValue, isOperator:boolean){

    //For Operators
    if(isOperator){

      if(inputValue==="="){

        //Search Operators and Calculate

        this.SearchOperator();
        return false;
       }      
      
      if(inputValue==="CLEAR"){
          this.Clear();
          return false;

      }      
      
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



  //Search the operators order and priority and get result
  
  Calculate(){

    switch(this.currentOperator){

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

    }    

  }


  Sum(){this.result=Number(this.firstValue)+Number(this.secondValue); }

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
  
  }


  Clear(){       
    this.result=0;
    this.displayValue="", this.currentOperator="",this.firstValue="",this.secondValue="";  
    //this.errorOp=false;  
  }


}
