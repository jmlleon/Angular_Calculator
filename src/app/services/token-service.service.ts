import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  BehaviorSubject,
  firstValueFrom,
  lastValueFrom,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthObject } from '../models/AuthObject.model';
import { TokenModelo } from '../models/Token.model';
import { AuthService } from './auth.service';
import { LocalStorageService } from './localstorage.service';

type Error = {
  headers: string;
  status: string;
  statusText: string;
  url: string;
  message: string;
  error: string;
};

@Injectable({
  providedIn: 'root',
})
export class TokenService {
 
  AppUrl = '/token';

  private jwtSubject = new BehaviorSubject<boolean>(false);
  public jwtAuth$ = this.jwtSubject.asObservable();

  private newTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public newToken$ = this.newTokenSubject.asObservable();

  authObject!: AuthObject | null;
  httpHeaders!: HttpHeaders;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private httpClient: HttpClient,
    private lstSvc: LocalStorageService
  ) {
    this.lstSvc.changeStorage$.subscribe((response) => {
      this.authObject = this.lstSvc.getAuthObject();

      this.httpHeaders = new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.authObject !== null
          ? this.authObject!.token.accessToken
          : ''
      );
    });
  }

  GetAccessToken() {
    this.authObject = this.lstSvc.getAuthObject();
    return this.authObject != null ? this.authObject.token.accessToken : '';
  }

  async CheckToken() {
    this.authObject = this.lstSvc.getAuthObject();

    const token: TokenModelo | null = this.authObject
      ? this.authObject.token
      : null;

    //console.log(`Is refresh ${JSON.stringify(token)}`);

    if (!token) {
      return false;
    }

    if (!this.jwtHelper.isTokenExpired(token.accessToken)) {
      this.jwtSubject.next(true);

      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token);

    // console.log(`Is refresh success ${isRefreshSuccess}`);

    this.jwtSubject.next(isRefreshSuccess);

    return isRefreshSuccess;
  }

  //Para

  async tryRefreshingTokens(token: TokenModelo) {
    
    if (!token.accessToken || !token.refreshToken) {
      this.newTokenSubject.next('El valor del token es nulo');
      return false;
    }

    var errorMessage: Error={error:"", headers:"", message:"", status:"", statusText:"", url:""};

    var tokenValue = await lastValueFrom(
      this.RefrescarToken(token)
    ).catch((error) => {
      errorMessage.error = error.error;
      // console.log(`El gran error es ${errorMessage.error}`);
    });

    if (tokenValue) {
      // console.log(`the valore es ok ${JSON.stringify(tokenValue)}`);

      this.authObject!.token.accessToken = tokenValue.accessToken;
      this.authObject!.token.refreshToken = tokenValue.refreshToken;

      this.lstSvc.setAuthObject(this.authObject);

      this.newTokenSubject.next('OK');

      return true;

    }else{

    //console.log("El ERROR ES:"+JSON.stringify(errorMessage.error));

    this.lstSvc.Clear();

    this.newTokenSubject.next(`${errorMessage.error}`);

    return false;
    }


  }

  option(token: TokenModelo) {
    let isRefreshSuccess: boolean = false;

    this.RefrescarToken(token).subscribe({
      next: (response) => {
        const newToken = response.accessToken;
        const newRefreshToken = response.refreshToken;

        //Modificar el AuthObject y Guardarlo en localstorage
        // If token refresh is successful, set new tokens in local storage.

        this.authObject!.token.accessToken = newToken;
        this.authObject!.token.refreshToken = newRefreshToken;
      },
      error: (error) => {
        console.log(error);
        isRefreshSuccess = false;
        this.newTokenSubject.next('ERROR');
      },
      complete: () => {
        this.lstSvc.setAuthObject(this.authObject);
        isRefreshSuccess = true;
        console.log(
          `The new token is: ${JSON.stringify(this.authObject?.token)}`
        );
        this.newTokenSubject.next('isRefreshSuccess');
      },
    });
  }

  private RefrescarToken(tokenModelo: TokenModelo) {
    console.log(`Refreshing tokens`);

    return this.httpClient.post<TokenModelo>(
      `${environment.ApiUrl}${this.AppUrl}/refresh`,
      tokenModelo,
      { headers: this.httpHeaders }
    );
    /* new HttpHeaders({
        "Content-Type": "application/json"
      }),
      observe: 'response'*/
  }

  private revokeToken() {
    // this.authObject =this.lstSvc.getAuthObject();

    //     this.httpHeaders = new HttpHeaders().set("Authorization", "Bearer " + this.authObject!==null ? this.authObject!.token.accessToken:"");

    return this.httpClient.post<TokenModelo>(
      `${environment.ApiUrl}${this.AppUrl}/revoke`,
      { headers: this.httpHeaders }
    );
  }

  RemoveToken() {
    this.lstSvc.Clear();
    this.jwtSubject.next(false);

    this.revokeToken().subscribe({
      // next:(response)=>{},
      error: (error) => {
        console.log(error);
      },
      complete: () => {},
    });
  }
}
