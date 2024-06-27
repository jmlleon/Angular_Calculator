export class ButtonCard{

    style:string="";
    buttonStyle:string="";
    buttonValue:string="";
    isOperator:boolean=false;
  
    constructor(style:string, buttonValue:string, isOperator:boolean){
      this.style=style;
      this.buttonValue=buttonValue;
      this.isOperator=isOperator;    
    }
  
  
  }
  
  export type ButtonType=Omit<ButtonCard,"style"|"buttonStyle">;