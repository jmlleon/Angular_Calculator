import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BgModType } from 'src/app/models/Enum.model';
import { BarService } from 'src/app/services/bar.service';

@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit, OnDestroy {

  @Input() title:string="";
  @Input() info:string="***";

  isDark:boolean=false;

  barSvc=inject(BarService);

  bar$:Subscription;

  constructor() { }

  ngOnInit(): void {
    this.setBgMode();
  }

  setBgMode(){

    this.bar$=this.barSvc.bgMode$.subscribe(mode=>{

      this.isDark=BgModType.black=== mode ? true:false;

    })

  }

  ngOnDestroy(): void {
    this.bar$.unsubscribe();
   }
 

}
