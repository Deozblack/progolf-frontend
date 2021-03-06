import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../environments/environment.prod';
import { map, catchError, tap } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { User, AuthResponse } from '../../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _usuario!: User;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http: HttpClient) { }

  login(correo: string, password: string){
    const url = `${this.baseUrl}/users/login`;
    const body = {correo, password};

    return this.http.post<AuthResponse>(url,body).pipe(
      tap(resp =>{
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
            this._usuario = {
              uid: resp.uid!,
              nombre: resp.nombre!,
              apellido: resp.apellido!,
              telefono: resp.telefono!,
              cp: resp.cp!,
              correo: resp.correo!
            }
            console.log(this._usuario);
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  crearUsuario(nombre: string, apellido: string, telefono:number, sc:string, cp: number, password:string, correo:string){
    const url = `${this.baseUrl}/users/new`;
    const body = {nombre, apellido, telefono, sc, cp, password, correo};
    
    return this.http.post<User>(url, body).pipe(
      tap(resp => {
        if (resp.ok) {
          localStorage.setItem('token', resp.token!);
            this._usuario = {
              uid: resp.uid!,
              nombre: resp.nombre!,
              apellido: resp.apellido!,
              telefono: resp.telefono!,
              cp: resp.cp!,
              correo: resp.correo!
            }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  validarToken(): Observable<boolean>{
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    const url = `${this.baseUrl}/users/renew`;

    return this.http.get<AuthResponse>(url, { headers })
      .pipe(
        map( resp => {
          localStorage.setItem('token',resp.token!);
            this._usuario = {
              uid: resp.uid!,
              nombre: resp.nombre!,
              apellido: resp.apellido!,
              telefono: resp.telefono!,
              cp: resp.cp!,
              correo: resp.correo!
            }     
          return resp.ok;
        }),
        catchError(err => of(false))
      )
  }


  logout(){
    localStorage.removeItem('token');
  }


  mostrarUsuario(id: string){
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

    const url = `${this.baseUrl}/users/user/${id} `;
    return this.http.get<{usuario:User}>(url, {headers})
  }


  actualizarUsuario(usuario:User){
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

    const url = `${this.baseUrl}/users/user/${usuario._id} `;
    return this.http.put(url,usuario, {headers});
  }

  actualizarPass(usuario:User){
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

    const url = `${this.baseUrl}/users/pass/${usuario._id} `;
    return this.http.put<AuthResponse>(url,usuario, {headers}).pipe(
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }





}
