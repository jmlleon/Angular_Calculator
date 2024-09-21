import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { ButtonType } from 'src/app/models/Calculator.model';



export function calculatorValidator(buttonObject:ButtonType): ValidatorFn {
  
  return (control:AbstractControl) : ValidationErrors | null => {

      //avoid validation if empty, we are not testing for required here

      if (control.value == null || control.value == '') {
          
          return null;
        }     
      
      const value = control.value;   
     

     return null;
      
  }

}


@Directive({
  selector: '[appCustomValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: CustomValidationDirective , multi: true}]
})
export class CustomValidationDirective implements Validator{

  constructor() { }

  @Input() buttonType:ButtonType;
  
  
  validate(control: AbstractControl): ValidationErrors | null {

    return calculatorValidator(this.buttonType)(control);
  }
 
 
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }

}
