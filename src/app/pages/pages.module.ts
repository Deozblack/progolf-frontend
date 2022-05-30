import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { GolfComponent } from './golf/golf.component';
import { AgendarComponent } from './agendar/agendar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { AgendaPersonalComponent } from './agenda-personal/agenda-personal.component';


@NgModule({
  declarations: [
    InicioComponent,
    GolfComponent,
    AgendarComponent,
    PerfilComponent,
    PagesComponent,
    LeccionesComponent,
    AgendaPersonalComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
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
