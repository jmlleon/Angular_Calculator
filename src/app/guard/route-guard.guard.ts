import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { TokenService } from '../services/token-service.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
 
  constructor(
    private tokenService: TokenService
   ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> { // | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
   
    //Aqui solo me interesa que se emita el jwtAuth$    
   
   this.tokenService.CheckToken();   
   
    return true;
  }
}
