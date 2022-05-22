import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
        this.router.navigateByUrl('dashboard/inicio');
      }
    })

  }

}
