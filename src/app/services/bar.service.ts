import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


export enum BgModType{

  //blue="mat-elevation-z3 bg-white hover:bg-gray-100 text-black",
  blue="bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/50",
  black="mat-elevation-z3 bg-black hover:bg-gray-700"
  
}

@Injectable({
  providedIn: 'root'
})

export class BarService { 
  

  private toggle: boolean = false;
  private toggleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public toggle$: Observable<boolean> = new Observable<boolean>();

  private bgMode:string=BgModType.blue;
  private bgModeSubject=new BehaviorSubject<string>(this.bgMode);
  public bgMode$=new Observable<string>();
  

  constructor() {

    this.toggle$ = this.toggleSubject.asObservable();
    this.bgMode$=this.bgModeSubject.asObservable();
  }


  public seToggle() {

    this.toggle = !this.toggle;
    this.toggleSubject.next(this.toggle);

  }

  public setBgMode(mode:string){
    
    this.bgMode=mode;
    this.bgModeSubject.next(mode);

  }


}
