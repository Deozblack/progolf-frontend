import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';


@NgModule({
  declarations: [
    AuthComponent,
    FormularioRegistroComponent,
    FormularioLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthComponent,
    FormularioRegistroComponent,
    FormularioLoginComponent
  ]
})
export class AuthModule { }
