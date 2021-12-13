import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { ViajesComponent } from './pages/viajes/viajes.component';
import { LoginGuard } from '../guards/login.guard';


const routes: Routes = [
  {path:'', canActivate:[LoginGuard],component: InicioComponent},
  {path:'inicio', canActivate:[LoginGuard], component: InicioComponent},
  {path: 'inicio/viajes', canActivateChild:[LoginGuard], component: ViajesComponent},
  {path: 'viajes', canActivateChild:[LoginGuard], component: ViajesComponent},
  {path: 'historial', canActivateChild:[LoginGuard], component: HistorialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
