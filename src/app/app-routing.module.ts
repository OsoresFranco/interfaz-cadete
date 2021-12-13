import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path: 'login', loadChildren:() => import('./login/login.module').then(m => m.LoginModule)},
  {path: '',canActivate: [LoginGuard], loadChildren:() => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'inicio', canActivateChild: [AuthGuard], loadChildren:() => import('./inicio/inicio.module').then(m => m.InicioModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
