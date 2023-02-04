import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class ValoresService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiValores/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  getById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiValores/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarValor(value: any) {
    return this.http.get(this.global.urlApi + '/ApiValores/Eliminar?token=' + localStorage.getItem('token'), { params: value });
  }

  listarValoresPorFiltro(value: any) {
    return this.http.post(this.global.urlApi + '/ApiValores/GetListByFilter?token=' + localStorage.getItem('token'), value);
  }

}
