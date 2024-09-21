import { inject, Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { ValidationType } from 'src/app/models/Calculator.model';
import { OperatorType } from 'src/app/models/Enum.model';
import { SnackBarService } from 'src/app/services/snackbar.service';


@Injectable({
    providedIn: 'root'
  })
export class CustomValidatorsService{


operators:string[]=["/","*","-","+"];

private snackBarSvc=inject(SnackBarService);

constructor(){ }    

  
   calculatorValidator(validationObject:ValidationType): ValidatorFn {
  
    return (control:AbstractControl) : ValidationErrors | null => {       

        if(validationObject.isOperator && validationObject.buttonValue!==OperatorType.clear && validationObject.buttonValue!==OperatorType.equal){      

          
            //The First Value Cannt be a operator
      
            if(validationObject.displayValue.length===0){//&& validationObject.buttonValue!==OperatorType.rest

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
