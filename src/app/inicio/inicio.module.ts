import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { HeaderComponent } from '../components/header/header.component';
import { MaterialModule } from '../material/material/material.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    InicioComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class InicioModule { }
