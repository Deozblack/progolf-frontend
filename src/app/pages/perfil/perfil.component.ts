import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/users';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioSelect:User | any;
  constructor( private auth: AuthService ) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  get usuario(){
    return this.auth.usuario;
  }

  // cargarTrabajadores(){
  //   this.auth.getTrabajadores().subscribe( ({trabajadores}) =>{

  //     this.trabajadores = trabajadores;
  //     this.trabajadores = this.trabajadores.filter(n => n.role !== 'admin')
  //     this.dataSource = new MatTableDataSource(this.trabajadores)

  //   });
  // }

  cargarUsuario(){
    this.auth.mostrarUsuario(this.usuario.uid).subscribe( ({usuario}) =>{
      this.usuarioSelect = usuario;
      console.log(this.usuarioSelect);
    })
  }

  guardar(){
    console.log(this.usuario.uid);
  }

}
