import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { MaterialModule } from '../material.module';
import { ShareModule } from '../share/share-module.module';


import { IndexComponent } from './index/index.component';

import { CalculatorDetailComponent } from './calculator/calculator-detail.component';
import { CalculatorCardComponent } from './calculator/card/card.component';




const routes:Routes=[
  {path:'',component:IndexComponent},
  {path:'index',component:IndexComponent}, 
]


@NgModule({
  declarations: [         
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
