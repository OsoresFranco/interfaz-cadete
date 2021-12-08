import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';


const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'inicio', loadChildren:() => import('../inicio/inicio.module').then(m => m.InicioModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
