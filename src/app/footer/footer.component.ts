import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BarService } from '../services/bar.service';
import { BgModType } from '../models/Enum.model';
import { Subscription } from 'rxjs';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  bgModeValue:string=BgModType.blue;

  year=()=>new Date().getFullYear(); 

  barService=inject(BarService);

  barService$:Subscription;

  faSmile=faSmile;

  constructor() { } 

  ngOnInit(): void {

    this.bgModeLoad();
  }
  
  bgModeLoad() {

    this.barService$=this.barService.bgMode$.subscribe(mode => {
      this.bgModeValue = mode;      

    })

  }

  ngOnDestroy(): void {
    this.barService$.unsubscribe();
  }

}
