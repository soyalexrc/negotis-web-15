import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaDineroService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  GetListadoByIdSucursal(value: any) {
    return this.http.get(this.global.urlApi + '/ApiTransferencia/Deposito/Dinero/GetListado?Token=' + localStorage.getItem('token'), { params: value });
  }
  
  GetDataInicioCrearEditar(value: any) {
    return this.http.get(this.global.urlApi + '/ApiTransferencia/Deposito/Dinero/GetData/Inicio/Crear/Editar?Token=' + localStorage.getItem('token'), { params: value });
  }

  getById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiTransferencia/Deposito/Dinero/GetById?Token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarTransDep(value: any) {
    return this.http.post(this.global.urlApi + '/ApiTransferencia/Deposito/Dinero/Eliminar?token=' + localStorage.getItem('token'), value);
  }

  crearEditarTransDep(value: any) {
    return this.http.post(this.global.urlApi + '/ApiTransferencia/Deposito/Dinero/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

}
