import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { MaterialModule } from '../material.module';
import { ShareModule } from '../share/share-module.module';


import { IndexComponent } from './index/index.component';
import { CardComponent } from './index/card/card.component';
import { MainComponent } from './main/main.component';
import { TeamComponent } from './team/team.component';
import { TeamCardComponent } from './team/card/team-card.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/card/product-card.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';
import { ServiceCardComponent } from './services/card/service-card.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guard/auth-guard.guard';
import { RouteGuard } from '../guard/route-guard.guard';




const routes:Routes=[
  {path:'',component:IndexComponent, canActivate:[RouteGuard]},//, 
  {path:'index',component:IndexComponent, canActivate:[RouteGuard]},//, 
  {path:'services',component:ServicesComponent, canActivate:[RouteGuard]},
  {path:'products',component:ProductsComponent, canActivate:[RouteGuard]},
  {path:'register',component:RegisterComponent, canActivate:[RouteGuard]},
  {path:'team',component:TeamComponent, canActivate:[RouteGuard]}, 
  //Ver aqui que hago para evitar ir al login cuando el usuario este logueado
  {path:'login',component:LoginComponent}, //, canActivate:[RouteGuard]
  ]



@NgModule({
  declarations: [

    CardComponent,
    MainComponent,
    TeamComponent,
    IndexComponent,
    ProductsComponent,
    ProductCardComponent,
    ServicesComponent,
    RegisterComponent,
    ServiceCardComponent,
    TeamCardComponent,
    LoginComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], 
  exports:[],
  providers: []
})
export class PageModule { }
