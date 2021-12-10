import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { ViajesComponent } from './pages/viajes/viajes.component';

const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:'inicio', component: InicioComponent},
  {path: 'inicio/viajes', component: ViajesComponent},
  {path: 'viajes', component: ViajesComponent},
  {path: 'historial', component: HistorialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
