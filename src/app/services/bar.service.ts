import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BgModType } from '../models/Enum.model';


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

  
  public setBgMode(){ 

    this.bgMode=this.bgMode === BgModType.blue ? BgModType.black:BgModType.blue;
    this.bgModeSubject.next(this.bgMode);    

  }


}
