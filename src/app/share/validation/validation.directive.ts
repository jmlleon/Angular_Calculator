import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class CustomValidators{


constructor(){


    }


  static calculatorValidator(): ValidatorFn {
  
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        console.log('The value is' +value);           
        

        /*if (!value) {
            return null;
        }  */          
        
        return {passwordStrength:false};

        
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