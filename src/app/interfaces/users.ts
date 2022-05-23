export interface User{
    ok?: boolean;
    _id?: string;
    uid: string;
    token?: string;
    nombre?: string;
    apellido?: string;
    telefono?: number;
    sc?: string;
    cp?: number;
    password?: string;
    correo?: string;
    msg?: string;
}
export interface AuthResponse{
    ok: boolean;
    uid?: string;
    _id?: string;
    nombre?: string;
    apellido?: string;
    correo?: string;
    password?:string;
    token?: string;
    msg?: string;
}
