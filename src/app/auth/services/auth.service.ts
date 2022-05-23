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
              nombre: resp.nombre!
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
              nombre: resp.nombre!
            }
            console.log(this._usuario);
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
              nombre: resp.nombre!
            }     
          return resp.ok;
        }),
        catchError(err => of(false))
      )
  }


  logout(){
    localStorage.removeItem('token');
  }





}
