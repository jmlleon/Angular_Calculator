import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexAdminComponent } from './pages/index-admin/index-admin.component';
import { UsersComponent } from './pages/users/users.component';
import { Routes, RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { ShareModule } from '../share/share-module.module';
import { AuthGuard } from '../guard/auth-guard.guard';
import { ClientsComponent } from './pages/clients/clients.component';
import { UserAddComponent } from './pages/users/user-add/user-add.component';
import { ClientAddComponent } from './pages/clients/client-add/client-add.component';
import { SendEmailComponent } from './pages/email/send-email/send-email.component';
import { EmailComponent } from './pages/email/email.component';
import { ResendEmailComponent } from './pages/email/resend-email/resend-email.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
import { ClientEditComponent } from './pages/clients/client-edit/client-edit.component';


const routes:Routes=[
  {path:'', component:IndexAdminComponent, canActivate:[AuthGuard]},
  {path:'index', component:IndexAdminComponent, canActivate:[AuthGuard]},//canActivate:[AuthGuardGuard]
  {path:'users', component:UsersComponent, canActivate:[AuthGuard]},//canActivate:[AuthGuardGuard]
  {path:'useradd', component:UserAddComponent, canActivate:[AuthGuard]},  
  {path:'user', component:UserEditComponent, canActivate:[AuthGuard]},  
  {path:'clients', component:ClientsComponent, canActivate:[AuthGuard]},
  {path:'clientadd', component:ClientAddComponent, canActivate:[AuthGuard]},
  {path:'client', component:ClientEditComponent, canActivate:[AuthGuard]},
  //{path:'clientedit/:id', component:ClientEditComponent, canActivate:[AuthGuard]},
  
  {path:'email', component:EmailComponent, canActivate:[AuthGuard]},  
  {path:'sendemail/:type', component:SendEmailComponent, canActivate:[AuthGuard]}
  ]

@NgModule({
  declarations: [
    IndexAdminComponent,
    UsersComponent,
    ClientsComponent,
    UserAddComponent,
    ClientAddComponent,
    SendEmailComponent,
    EmailComponent,
    ResendEmailComponent,
    UserEditComponent,
    ClientEditComponent    

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ShareModule
     
  ]
})
export class AdminModule { }
