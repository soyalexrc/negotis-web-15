import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class CategotriaClienteService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditarCategoriaCliente(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCategoriaCliente/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  listadoCategoriaClienteByIdClienteNegotis(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiCategoriaCliente/Listado/CategoriaCliente?token=' + localStorage.getItem('token'), { params: value });
  }

  getCategoriaClienteById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCategoriaCliente/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarCategoriaCliente(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCategoriaCliente/Delete?token=' + localStorage.getItem('token'), value);
  }
  
}
