import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

//import { JwtModule,JwtHelperService,JwtModuleOptions,JwtConfig } from "@auth0/angular-jwt";

import {HttpClientModule} from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './material.module';
// import { MaterializeButtonModule, MaterializeCardModule } from 'materialize-angular';



import { ShareModule } from './share/share-module.module';

import { PageModule } from './pages/page.module';

//Components
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { SideBarComponent } from './bar/side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';


import { ExampleBarComponent } from './bar/example-bar/example-bar.component';
import { ExampleCardComponent } from './card/example-card/example-card.component';
import { JwtModule } from '@auth0/angular-jwt';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    
    AppComponent,
    BarComponent,
    SideBarComponent,   
    FooterComponent,    
    ExampleBarComponent,     
    ExampleCardComponent,
  
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
    PageModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44325'],        
        disallowedRoutes: []
      }
    }),
   

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],  
  providers: [],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
