import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {

  userForm: FormGroup = this.fb.group({
    nombre:['', [Validators.required, Validators.min(4)]],
    apellido:['', [Validators.required, Validators.min(4)]],
    telefono:['', [Validators.required, Validators.min(10)]],
    sc:['', [Validators.required]],
    cp:['', [Validators.required]],
    password:['', [Validators.required, Validators.minLength(4)]],
    correo:['', [Validators.required, Validators.email]],
    tc:['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  crearUsuario(){
    const { nombre, apellido, telefono, sc, cp, password, correo} = this.userForm.value;
    
    this.authService.crearUsuario(nombre, apellido, telefono, sc, cp, password, correo)
    .subscribe(ok => {
        console.log(ok.nombre);

        if (ok === true) {
          Swal.fire(
            {
              title: 'Registro exitoso!',
              text: `Bienvenido a PRO Golf analysis ${nombre}`,
              icon: 'success',
              confirmButtonColor: '#8dc641',
              confirmButtonText: 'Aceptar'
            }
          ).then( (result) =>{
            if (result.value) {
              this.router.navigateByUrl('dashboard/inicio');
            }
          })
        }else{
          Swal.fire(
            {
              title: 'Error!',
              text: `${ok}`,
              icon: 'error',
              confirmButtonColor: '#ff0000',
              confirmButtonText: 'Aceptar'
            }
          )
        }
      })    
  }

}
