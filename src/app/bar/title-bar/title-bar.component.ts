import { Component, Input, OnInit } from '@angular/core';
import { BgModType } from 'src/app/models/Enum.model';
import { BarService } from 'src/app/services/bar.service';

@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  @Input() title:string="";
  @Input() info:string="***";

  isDark:boolean=false;

  constructor(private barSvc:BarService) { }

  ngOnInit(): void {
    this.setBgMode();
  }

  setBgMode(){

    this.barSvc.bgMode$.subscribe(mode=>{

      this.isDark=BgModType.black=== mode ? true:false;

    })

  }

}
