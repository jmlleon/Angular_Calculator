import { Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { ValidationType } from 'src/app/models/Calculator.model';
import { OperatorType } from 'src/app/models/Enum.model';
import { SnackBarService } from 'src/app/services/snackbar.service';


@Injectable({
    providedIn: 'root'
  })
export class CustomValidatorsService{


operators:string[]=["/","*","-","+"];

constructor(private snackBarSvc:SnackBarService){ }    

  
   calculatorValidator(validationObject:ValidationType): ValidatorFn {
  
    return (control:AbstractControl) : ValidationErrors | null => {

        //avoid validation if empty, we are not testing for required here

        //console.log(`Button Value ${validationObject.buttonValue} ${validationObject.isOperator}`);        

        //console.log('Control value is ' +control.value); 

        console.log('Input Field Value ' +validationObject.displayValue); 
       

        if(validationObject.isOperator){            

          
            //The First Value Cannt be a operator
      
            if(validationObject.displayValue.length===0){

               this.snackBarSvc.OpenSnackBar({title:"The First Value Cannt be a operator", type:"ERROR"});             
              
              return {validationError:true};
            }
      
            //Avoid two operators sequence
      
            if(this.operators.includes(validationObject.displayValue.charAt(validationObject.displayValue.length-1))){
              this.snackBarSvc.OpenSnackBar({title:"Two or more squence operator not allowed", type:"ERROR"});
              
              return {validationError:true};
      
            }  
            
        } 
                
        //Check Div Under Cero

        if(validationObject.displayValue.charAt(validationObject.displayValue.length-1)===OperatorType.divide && validationObject.buttonValue==='0'){
            
            this.snackBarSvc.OpenSnackBar({title:"Div under cero not allowed", type:"ERROR"});            
            return {validationError:true};
    
          }  


       return null;
        
    }
}

}


/*
export function calculatorValidator(): ValidatorFn {
  
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
}

*/