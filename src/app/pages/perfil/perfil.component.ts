import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/users';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioSelect:User | any;
  meses = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  day = new Date();

  userForm: FormGroup = this.fb.group({
    nombre:[this.usuario.nombre, [Validators.required, Validators.min(4)]],
    apellido:[this.usuario.apellido, [Validators.required, Validators.min(4)]],
    telefono:[this.usuario.telefono, [Validators.required, Validators.min(10)]],
    cp:[this.usuario.cp, [Validators.required]],
    date:[this.day,[Validators.required]],
    direccion:['', [Validators.required]],
    estado:['', [Validators.required]],
    ciudad:['', [Validators.required]]
  });

  passForm: FormGroup = this.fb.group({
    oldPassword:['', [Validators.required, Validators.min(4)]],
    newPassword:['', [Validators.required, Validators.min(4)]],
    repPassword:['', [Validators.required, Validators.min(4)]]
  });

  constructor( 
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  get usuario(){
    return this.auth.usuario;
  }

  

  cargarUsuario(){
    this.auth.mostrarUsuario(this.usuario.uid).subscribe( ({usuario}) =>{
      
      
      let {nombre, apellido, telefono, cp, date, direccion, estado, ciudad } = usuario;
      this.usuarioSelect = usuario;      
      // date = new Date();
      // let dia = date.getDate();
      // let mes = this.meses[date.getMonth()];
      // let anio = date.getFullYear();
      // this.fechaTemporal = `${anio}-${mes}-${dia}`
      

      this.userForm.setValue({nombre, apellido, telefono, cp, date, direccion, estado, ciudad});
    })
  }

  guardarInfoPersonal(){
    const data = {
      ...this.userForm.value,
      _id: this.usuarioSelect._id
  }
    this.auth.actualizarUsuario(data).subscribe( resp =>{
      
      Swal.fire(
        {
          title: 'Usuario actualizado',
          text: `${data.nombre} se ha actualizado correctamente`,
          icon: 'success',
          confirmButtonColor: '#8dc641',
          confirmButtonText: 'Aceptar'
        }
      ).then((result) =>{
        if (result.value) {
          this.router.navigateByUrl('dashboard/perfil');
        }
      })
    })
  }


  guardarPass(event: any){
    let {oldPassword, newPassword, repPassword} = this.passForm.value;

    if (newPassword != repPassword) {
      Swal.fire(
        {
          title: 'Error!',
          text: `La confirmación del password no coincide..`,
          icon: 'error',
          confirmButtonColor: '#8dc641',
          confirmButtonText: 'Aceptar'
        }
      )
      return
    }
    
  const data = {
      ...this.passForm.value,
      _id: this.usuarioSelect._id
  }
    this.auth.actualizarPass(data).subscribe( ok =>{

        if(ok === true){
          Swal.fire(
            {
              title: 'Password actualizado',
              text: `Tu password se actualizo correctamente`,
              icon: 'success',
              confirmButtonColor: '#8dc641',
              confirmButtonText: 'Aceptar'
            }
          ).then((result) =>{
            if (result.value) {
              this.router.navigateByUrl('dashboard/perfil');
            }
          })
        }else{
          Swal.fire(
            {
              title: 'Error!!',
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
