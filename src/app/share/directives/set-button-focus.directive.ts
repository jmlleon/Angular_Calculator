import { Directive, ElementRef, inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { BgModType } from 'src/app/models/Enum.model';

@Directive({
  selector: '[SetFocus]'
})
export class SetButtonFocusDirective implements OnInit, OnChanges {

  elementRef=inject(ElementRef);
  render=inject(Renderer2);

  @Input() focusValue:string;

  constructor() { }

  ngOnInit(): void {    
  }

//changes: SimpleChanges
  ngOnChanges(): void {
   
    console.log("The Focus Value"+this.focusValue); 
    
    //Check for Enter Keypress Value iqual ==

    let button=this.elementRef.nativeElement;
    
    if(button.id===this.focusValue){      
    
      this.render.addClass(button,"bg-red-600");

      setTimeout(()=>{

        this.render.removeClass(button,"bg-red-600");
        this.RemoveClassDarkMode();
        //this.render.removeClass(button,"bg-black");
        // black="mat-elevation-z3 bg-black hover:bg-gray-700"
        //Fix for Dark Mode
      }   
      
      ,1000);   
    
    }

    
  }

  AddClassDarkMode(){

    let bgmode=BgModType.black.split(" ");

    bgmode.forEach(e=>{

      this.render.addClass(this.elementRef.nativeElement,e);

    });


  }
  
  
  RemoveClassDarkMode(){

    let bgmode=BgModType.black.split(" ");

    bgmode.forEach(e=>{

      this.render.removeClass(this.elementRef.nativeElement,e);

    });
  } 

}
