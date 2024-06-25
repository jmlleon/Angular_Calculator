import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BarService } from 'src/app/services/bar.service';
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
  readyOpt:boolean=false;

  bgModeValue:string="";


  constructor(
    private fb:FormBuilder,
    private snackBarSvc:SnackBarService,
    private barSvc:BarService

  ) {

    this.formGroup=fb.group({

      "main-input":["", ]//Validators.pattern()

    }

    )

   }

  ngOnInit(): void {


  }

  SetDisplay(value){

    
    if(this.ValidateInput(value.buttonValue, value.isOperator)){

      this.displayValue=this.displayValue+value.buttonValue;     
      
      //Is a Number
      if(!value.isOperator){

         //If is the second value
         //console.log("Not Operator");
         //var element=this.displayValue.charAt(this.displayValue.length-2);
         

        if(this.currentOperator!==""){//operators.includes(this.displayValue.charAt(this.displayValue.length-2))

          //console.log("Calculate now");
          this.readyOpt=true;
          this.secondValue+=value.buttonValue;          
            
        }else{

          //If is the first value
          //console.log("If is the first value");
          this.firstValue+=value.buttonValue;
        }     


      
      }else{

        //console.log("Is Operator");
        this.currentOperator=value.buttonValue;        

      }      

    }   

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


  //Validate Input
  ValidateInput(inputValue, isOperator:boolean){

  
    if(isOperator){


      if(inputValue==="="){
        this.Calculate();
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

  Sum(){

    this.result=Number(this.firstValue)+Number(this.secondValue);
    this.displayValue=this.result.toString();
    this.currentOperator="";
    this.readyOpt=false;
    //this.formGroup.get("main-input").setValue(value);

  }

  Rest(){

    this.result=Number(this.firstValue)-Number(this.secondValue);
    this.displayValue=this.result.toString();
    this.currentOperator="";
    this.readyOpt=false;

  }

  Multi(){

    this.result=Number(this.firstValue) * Number(this.secondValue);
    this.displayValue=this.result.toString();
    this.currentOperator="";
    this.readyOpt=false;

  }

  Divide(){

    if(this.secondValue!=="0"){

      this.result=Number(this.firstValue) / Number(this.secondValue);
      this.displayValue=this.result.toString();
      this.currentOperator="";
      this.readyOpt=false;


    }else{

     this.snackBarSvc.OpenSnackBar({title:"Div under cero not allowed", type:"ERROR"});

    }    

  }


  Clear(){

    this.formGroup.get("main-input").setValue("");   
    this.result=0;
    this.displayValue="", this.currentOperator="";
    this.firstValue="", this.secondValue="";
  }



}
