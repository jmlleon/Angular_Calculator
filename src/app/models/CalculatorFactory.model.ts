import { AddCalculator, DivideCalculator, MultiCalculator, RestCalculator } from "./Calculator.model"
import { Dictionary, ICalculator } from "./Interfaces/ICalculator.model"


export class CalculatorFactory{


 optDictionary:Dictionary<ICalculator>={
     
    '+':new AddCalculator(),
    '-':new RestCalculator(),
    '*':new MultiCalculator(),
    '/':new DivideCalculator()
    
  }

  getCalculatorType(type:string){

    return this.optDictionary[type];

  }



}

/*
  let userAges2: Map<string, ()=>ICalculator> = new Map([
    ['John',  ()=>AddCalculator]   
  ])*/
  
  