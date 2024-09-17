import { SnackBarService } from '../services/snackbar.service';
import { ICalculator } from './Interfaces/ICalculator.model';

export class ButtonCard {
  style: string = '';
  buttonStyle: string = '';
  buttonValue: string = '';
  isOperator: boolean = false;

  constructor(style: string, buttonValue: string, isOperator: boolean) {
    this.style = style;
    this.buttonValue = buttonValue;
    this.isOperator = isOperator;
  }
}

export type ButtonType = Omit<ButtonCard, 'style' | 'buttonStyle'>;

export class AddCalculator implements ICalculator {
  Calculate(value1: string, value2: string): number {
    return Number(value1) + Number(value2);
  }
}

export class RestCalculator implements ICalculator {
  Calculate(value1: string, value2: string): number {
    return Number(value1) - Number(value2);
  }
}

export class MultiCalculator implements ICalculator {
  Calculate(value1: string, value2: string): number {
    return Number(value1) * Number(value2);
  }
}

export class DivideCalculator implements ICalculator {

 /* constructor(private snackBarSvc:SnackBarService){
  }*/
 
  Calculate(value1: string, value2: string): number {

    if(Number(value2)===0){
      
      //this.snackBarSvc.OpenSnackBar({title:"Div under cero not allowed", type:"ERROR"});

      return -1;
      //this.errorOp=true;
      //this.Clear();
    }else{
      return Number(value1) / Number(value2);
    }        
  }
}

