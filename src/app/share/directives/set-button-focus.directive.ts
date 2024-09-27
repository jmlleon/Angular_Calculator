import { Directive, ElementRef, inject, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { BgModType } from 'src/app/models/Enum.model';
import { BarService } from 'src/app/services/bar.service';

@Directive({
  selector: '[SetFocus]'
})
export class SetButtonFocusDirective implements OnInit, OnChanges {

  elementRef=inject(ElementRef);
  render=inject(Renderer2);
  barSvc=inject(BarService);

  bgModeValue:string;

  @Input() focusValue:string;

  constructor() { }

  ngOnInit(): void {  
    
    this.barSvc.bgMode$.subscribe((bgMode)=>{
      this.bgModeValue=bgMode;
    });

  }

  ngOnChanges(): void {
   
    //console.log("The Focus Value"+this.focusValue);    

    let button=this.elementRef.nativeElement;

    if(this.bgModeValue===BgModType.blue && button.id===this.focusValue){

      this.render.addClass(button,"bg-red-600");

      setTimeout(()=>{
        this.render.removeClass(button,"bg-red-600");    
       
      }   
      
      ,1000);   

    }
    
    if(this.bgModeValue===BgModType.black && button.id===this.focusValue){ 
      
      this.render.removeClass(button,"bg-black");
      this.render.addClass(button,"bg-red-600");

      setTimeout(()=>{

        this.render.removeClass(button,"bg-red-600"); 
        this.render.addClass(button,"bg-black");   
       
      }   
      
      ,1000);        
    
    }

    
  }

  /*AddClassDarkMode(){

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
  } */

}
