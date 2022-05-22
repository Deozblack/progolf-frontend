import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    correo:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(4)]]
  });
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    
    const {correo, password} = this.loginForm.value;

    this.authService.login(correo, password).subscribe(ok =>{
      
      if (ok === true) {
        Swal.fire(
          {
            title: 'Credenciales correctas',
            text: `Bienvenido a PRO Golf analysis`,
            icon: 'success',
            confirmButtonColor: '#8dc641',
            confirmButtonText: 'Aceptar'
          }
        ).then( ( result =>{
          if(result.value){
            this.router.navigateByUrl('dashboard/inicio');
          }
        }))  
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
