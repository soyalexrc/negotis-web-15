import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';
import { ProveedorCrearEditarModel } from '../pages/cliente/proveedor-crear-editar/proveedor-crear-editar-model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(public http: HttpClient, private global: GlobalService) {

  }

  crear(value: ProveedorCrearEditarModel) {
    return this.http.post(this.global.urlApi + '/apiproveedor/post?token=' + localStorage.getItem('token'), value);
  }

  editar(value: ProveedorCrearEditarModel) {
    return this.http.put(this.global.urlApi + '/apiproveedor/put?token=' + localStorage.getItem('token'), value);
  }

  getAll(){
    return this.http.get(this.global.urlApi + '/apiproveedor/getall?token=' + localStorage.getItem('token') + '&idClienteNegotis=' + localStorage.getItem('idClienteNegotis'));
  }

  get(id: number) {
    return this.http.get(this.global.urlApi + '/apiproveedor/getbyid?id=' + id + '&token=' + localStorage.getItem('token'));
  }

  delete(value: any) : any{
    return this.http.delete(this.global.urlApi + '/apiproveedor/delete?id=' + value + '&token=' + localStorage.getItem('token'));
  }

}
