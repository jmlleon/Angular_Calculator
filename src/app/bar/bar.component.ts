import { compileFactoryFunction } from '@angular/compiler';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {faHome,faMoon} from '@fortawesome/free-solid-svg-icons';
import { BarService } from '../services/bar.service';
import { SnackBarService } from '../services/snackbar.service';
import { BgModType } from '../models/Enum.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit, OnDestroy {
  
  faHome = faHome;  
  faMoon = faMoon;  

  isAuthenticated = false; valuesLoading = true;

  bgModeValue: string = '';  

  isDark=false;


  barService$:Subscription;

  barService=inject(BarService);

  constructor() {}


  

  ngOnInit() {      

    this.bgModeLoad();
    this.valuesLoading = false;    
  }
  

  bgModeLoad() {
   
   this.barService$=this.barService.bgMode$.subscribe((mode) => {
      this.bgModeValue = mode;  
      this.isDark=this.bgModeValue===BgModType.black ? true:false;    
    });
  }

  setToggle() {
    this.barService.seToggle();
  }

  setBgMode() {     
    this.barService.setBgMode();   
  }

  ngOnDestroy(): void {
    this.barService$.unsubscribe();
  }
  
}
