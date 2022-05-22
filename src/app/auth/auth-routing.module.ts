import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioRegistroComponent } from './components/formulario-registro/formulario-registro.component';
import { AuthComponent } from './pages/auth/auth.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';

const routes: Routes = [
  {
    path:'',
    component: AuthComponent,
    children:[
      {
        path:'registro',
        component: FormularioRegistroComponent
      },
      {
        path:'login',
        component: FormularioLoginComponent
      },
      {
        path:'**',
        redirectTo: 'registro'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
