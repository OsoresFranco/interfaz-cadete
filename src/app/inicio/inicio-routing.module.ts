import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio.component';
import { ViajesComponent } from './pages/viajes/viajes.component';

const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:'viajes', component: ViajesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
