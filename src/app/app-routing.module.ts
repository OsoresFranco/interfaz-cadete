import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: 'login', loadChildren:() => import('./login/login.module').then(m => m.LoginModule)},
  {path: '', loadChildren:() => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'inicio', loadChildren:() => import('./inicio/inicio.module').then(m => m.InicioModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
