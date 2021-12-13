import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path: 'login', loadChildren:() => import('./login/login.module').then(m => m.LoginModule)},
  {path: '',canActivate: [LoginGuard], loadChildren:() => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'inicio', canActivateChild: [AuthGuard], loadChildren:() => import('./inicio/inicio.module').then(m => m.InicioModule)},
  {path:'**', component: Error404Component}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
