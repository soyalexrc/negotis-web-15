import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaGastoService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCategoriaGasto/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  listadoCategoriaGastoByIdClienteNegotis(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCategoriaGasto/Listado?token=' + localStorage.getItem('token'), { params: value });
  }

  getById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCategoriaGasto/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarCategoriaGasto(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCategoriaGasto/Eliminar?token=' + localStorage.getItem('token'), value);
  }
}
