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

export type SnackBarData={

  title:string,
  type:string
  
}


export type ButtonType = Omit<ButtonCard, 'style' | 'buttonStyle'>;

export type ValidationType= ButtonType & { displayValue: string }

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
 
  Calculate(value1: string, value2: string): number {

      return Number(value1) / Number(value2);
            
  }
}

