import { compileFactoryFunction } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faHome,
  faMoon,
  faSign,
  faSignInAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { BarService, BgModType } from '../services/bar.service';
import { SnackBarService } from '../services/snackbar.service';

@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css'],
})
export class BarComponent implements OnInit {
  faHome = faHome;
  faBars = faBars;
  faUser = faUser;
  faMoon = faMoon;
  faSign = faSignInAlt;

  isAuthenticated = false;

   bgModeValue: string = '';

  valuesLoading = true;

  constructor(
    private barService: BarService,

    private snackBarSvc: SnackBarService,
    
  ) {}

  ngOnInit() {
    // this.valuesLoading=true;

   

    this.bgModeLoad();

    this.valuesLoading = false;

    
  }
  

  bgModeLoad() {
    this.barService.bgMode$.subscribe((mode) => {
      this.bgModeValue = mode;
      console.log(mode);
    });
  }

  setToggle() {
    this.barService.seToggle();
  }

  setBgMode() {
    if (this.bgModeValue === BgModType.blue) {
      this.barService.setBgMode(BgModType.black);
    } else {
      this.barService.setBgMode(BgModType.blue);
    }
  }
}
