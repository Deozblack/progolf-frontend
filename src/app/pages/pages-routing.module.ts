import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { GolfComponent } from './golf/golf.component';
import { AgendarComponent } from './agendar/agendar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LeccionesComponent } from './lecciones/lecciones.component';
import { AgendaPersonalComponent } from './agenda-personal/agenda-personal.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children:[
      {
        path:'inicio',
        component:InicioComponent
      },
      {
        path:'golf',
        component:GolfComponent
      },
      {
        path:'agendar',
        component:AgendarComponent
      },
      {
        path:'perfil',
        component:PerfilComponent
      },
      {
        path:'lecciones',
        component:LeccionesComponent
      },
      {
        path:'agenda-personal',
        component:AgendaPersonalComponent
      },
      {
        path:'**',
        redirectTo: 'inicio'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
