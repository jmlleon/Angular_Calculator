import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  
  {path:'index',loadChildren:()=> import('./pages/page.module').then(u=>u.PageModule)},
  {path:'admin', loadChildren:()=> import('./admin/admin-module.module').then(u=>u.AdminModule)},  
  // {path:'unidad',loadChildren:()=> import('./admin/unidad/unidad.module').then(m=>m.UnidadModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
