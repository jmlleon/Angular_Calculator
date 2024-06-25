import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { MaterialModule } from '../material.module';
import { ShareModule } from '../share/share-module.module';


import { IndexComponent } from './index/index.component';
import { CardComponent } from './index/card/card.component';

import { CalculatorDetailComponent } from './calculator/calculator-detail.component';
import { CalculatorCardComponent } from './calculator/card/card.component';




const routes:Routes=[
  {path:'',component:CalculatorDetailComponent},
  {path:'index',component:IndexComponent}, 
  {path:'calculator',component:CalculatorDetailComponent}, 
  //{path:'login',component:Component, canActivate:[RouteGuard]}

]


@NgModule({
  declarations: [
    CardComponent,      
    IndexComponent,   
    CalculatorDetailComponent,
    CalculatorCardComponent

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
