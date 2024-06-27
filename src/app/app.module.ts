import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './material.module';

import { ShareModule } from './share/share-module.module';

import { PageModule } from './pages/page.module';

//Components
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { FooterComponent } from './footer/footer.component';





@NgModule({
  declarations: [
    
    AppComponent,
    BarComponent,   
    FooterComponent,  
  
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,        
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,    
    MaterialModule,
    ShareModule,
    PageModule   

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],  
  providers: [],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
