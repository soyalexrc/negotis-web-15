import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(public http: HttpClient, private global: GlobalService) {

  }

  crearEditarRol(value: any) {
    return this.http.post(this.global.urlApi + '/ApiRol/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  GetListRolByClienteNegotis(value: any) {
    return this.http.get(this.global.urlApi + '/ApiRol/Listado/Roles?token=' + localStorage.getItem('token'), { params: value });
  }

  adjudicarRol(value: any){
    return this.http.post(this.global.urlApi + '/ApiRol/Adjudicar/Rol?token=' + localStorage.getItem('token'), value);
  }

  GetRolById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiRol/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  delete(value: any){
    return this.http.post(this.global.urlApi + '/ApiRol/Delete?token=' + localStorage.getItem('token'), value);
  }

}
