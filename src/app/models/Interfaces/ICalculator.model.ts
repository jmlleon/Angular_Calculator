
export interface ICalculator{

    Calculate(value1:string, value2:string):number;

}


export interface Dictionary<T>{
    [key: string]: T
 }
 
