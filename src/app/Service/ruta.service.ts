import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  getRutaById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiRuta/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiRuta/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  getRutasByIdClienteNegotis(value: any) {
    return this.http.get(this.global.urlApi + '/ApiRuta/listado?token=' + localStorage.getItem('token'), { params: value });
  }

  getRutasBySucursal(value: any) {
    return this.http.get(this.global.urlApi + '/ApiRuta/listadoBySucursal?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiRuta/Delete?token=' + localStorage.getItem('token'), value);
  }
}
