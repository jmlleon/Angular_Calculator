import { Component, OnInit } from '@angular/core';
import {  AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faEye,
  faEyeSlash,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthObject } from 'src/app/models/AuthObject.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { SnackBarService } from 'src/app/services/snackbar.service';
import { TokenService } from 'src/app/services/token-service.service';

export type LoginData = {
  login: string;
  password: string;
};

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
 
  formGroup: FormGroup;
 
  loginLoading=false; 

  visiblePwd = false;

  faUserCircle = faUserCircle;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  authObject!: AuthObject;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private snackBarSvc:SnackBarService,
    private tokenSvc:TokenService,
    private lstSvc:LocalStorageService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  Login() {

    this.loginLoading=true;
    
    var data: LoginData = {
      login: this.formGroup.get('login')?.value,
      password: this.formGroup.get('password')?.value,
    };
   
    this.authSvc.AutenticarUsuario(data).subscribe({
      next: (response) => (this.authObject = response),
      error: (error) => {      
        this.loginLoading = false;
        this.snackBarSvc.OpenSnackBar({title:'Ha ocurrido un error al Autenticarse', type:"ERROR"});
      },
      complete: () => {
      
        this.loginLoading = false;

        //Llamar al localstorageSvc
        this.lstSvc.setAuthObject(this.authObject);
       
        // this.authSvc.SetAuthObject = this.authObject;

        this.tokenSvc.CheckToken();

         //Emite el usuario logueado
        //this.authSvc.EmitCurrentUser();        

        // console.log(JSON.stringify(this.authObject))

        this.router.navigate(['/index']);
      },
    });

   
  }

  get f(){

    return this.formGroup.controls;
  }

  // get login(){

  //   return this.formGroup.get('login');

  // }

  // password(){

  //   return this.formGroup.get("password");

  // }

  SetVisible() {
    this.visiblePwd = !this.visiblePwd;
  }
}
