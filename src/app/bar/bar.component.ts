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
import { AuthObject } from '../models/AuthObject.model';
import { TokenModelo } from '../models/Token.model';
import { AuthService } from '../services/auth.service';
import { BarService, BgModType } from '../services/bar.service';
import { LocalStorageService } from '../services/localstorage.service';
import { SnackBarService } from '../services/snackbar.service';
import { TokenService } from '../services/token-service.service';

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

  authObject!: AuthObject | null;

  bgModeValue: string = '';

  valuesLoading = true;

  constructor(
    private barService: BarService,
    private authSvc: AuthService,
    private tokenSvc: TokenService,
    private snackBarSvc: SnackBarService,
    private lstSvc:LocalStorageService
  ) {}

  ngOnInit() {
    // this.valuesLoading=true;

    this.getCurrentUser();

    this.getIsAuthenticated();

    this.bgModeLoad();

    this.valuesLoading = false;

    this.test();

  }

  async RefreshToken(){

    var token:TokenModelo=this.lstSvc.getAuthObject()!.token;

    const response=await this.tokenSvc.tryRefreshingTokens(token);

    console.log(`Is refresh success 1 ${response}`);

  }


  //Prueba para mostrar en pantalla cuando un token se renovo correctamente
  test() {
   
    this.tokenSvc.newToken$.subscribe((response) => {
      if (response==='OK') {
        this.snackBarSvc.OpenSnackBar({
          title: 'Token Renovado con Exito',
          type: 'OK',
        });
      } else {
        this.snackBarSvc.OpenSnackBar({
          title: `Token Renovado con Problemas: ${response}`,
          type: 'ERROR',
        });
      }
    });
  }

  //Para controlar acceso a la barra
  getIsAuthenticated() {
    this.authSvc.isAuthenticated().subscribe((response) => {
      //this.autenticadoEmiter.emit(response);
      this.isAuthenticated = response;

      console.log(`Esta authenticado ${response}`);
    });
    //return this.authservice.isAuthenticated();
  }

  //Obtener Usuario logueado en la app
  getCurrentUser() {
    this.authSvc.usuarioActual$.subscribe((response) => {
      this.authObject = response;
    });
  }

  CerrarSession() {
    this.authSvc.CerrarSession();
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
