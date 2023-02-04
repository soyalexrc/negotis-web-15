import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class CuentaFinanzaDetalleService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCuentaDetalle/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  EditarLote(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCuentaDetalle/EditarLote?token=' + localStorage.getItem('token'), value);
  }

  getById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCuentaDetalle/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminar(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCuentaDetalle/Eliminar?token=' + localStorage.getItem('token'), { params: value });
  }

  listarValoresPorFiltro(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCuentaDetalle/GetListByFilter?token=' + localStorage.getItem('token'), { params: value });
  }
}
