import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { TokenService } from '../services/token-service.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService:TokenService,
    private router:Router
    ) {

  }
  
  async canActivate(route: ActivatedRouteSnapshot,  state: RouterStateSnapshot): Promise<boolean>// | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {

      var result=await this.tokenService.CheckToken();     

      if(!result){       
    
       this.router.navigate(["/index"]);      
    
       }     
    
       return result;

  }



 


  
}
