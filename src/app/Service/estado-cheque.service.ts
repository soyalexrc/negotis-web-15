import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoChequeService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiEstadoCheque/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  getById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiEstadoCheque/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminar(value: any) {
    return this.http.get(this.global.urlApi + '/ApiEstadoCheque/Eliminar?token=' + localStorage.getItem('token'), { params: value });
  }

  listarValoresPorFiltro(value: any) {
    return this.http.get(this.global.urlApi + '/ApiEstadoCheque/GetListByFilter?token=' + localStorage.getItem('token'), { params: value });
  }
}
