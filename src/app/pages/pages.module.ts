import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { GolfComponent } from './golf/golf.component';
import { AgendarComponent } from './agendar/agendar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InicioComponent,
    GolfComponent,
    AgendarComponent,
    PerfilComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ],
  exports:
  [
    PagesComponent,
    InicioComponent,
    GolfComponent,
    AgendarComponent,
    PerfilComponent
  ]
})
export class PagesModule { }
