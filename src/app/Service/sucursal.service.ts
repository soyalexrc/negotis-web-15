import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';
import { SucursalCrearEditarModel } from '../pages/general/sucursal-crear-editar/sucursal-crear-editar-model';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  crearEditarSucursal(value: SucursalCrearEditarModel) {
    return this.http.post(this.global.urlApi + '/ApiSucursal/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  getSucursalesByUsuario(value: any) {
    return this.http.get(this.global.urlApi + '/ApiSucursal/Get/Usuario/Sucursales?token=' + localStorage.getItem('token'), { params: value });
  }

  getSucursalById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiSucursal/GetById?token=' + localStorage.getItem('token'), { params: value });
  }


  getUsuarioSucursalesByUser(value: any) {
    return this.http.get(this.global.urlApi + '/ApiSucursal/Get/UsuarioSucursales?token=' + localStorage.getItem('token'), { params: value });
  }

  seleccionarSucursal(value: any) {
    return this.http.post(this.global.urlApi + '/ApiSucursal/Seleccionar/Sucursal?token=' + localStorage.getItem('token'), value);
  }

  deshabilitar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiSucursal/Deshabilitar/Habilitar?token=' + localStorage.getItem('token'), value);
  }

  borrar(value: any) : any{
    return this.http.delete(this.global.urlApi + '/ApiSucursal/delete?id=' + value + '&token=' + localStorage.getItem('token'));
  }

  sucursalSeleccionadaByUsuario(value: any) {
    return this.http.get(this.global.urlApi + '/ApiSucursal/Get/Sucursal/Seleccionada?token=' + localStorage.getItem('token'), { params: value });
  }

}
