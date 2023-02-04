import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiZonas/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  getZonaById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiZonas/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  listadoZonasByIdClienteNegotis(value: any) {
    return this.http.get(this.global.urlApi + '/ApiZonas/listado/Zonas?token=' + localStorage.getItem('token'), { params: value });
  }

  deleteZona(value: any) {
    return this.http.post(this.global.urlApi + '/ApiZonas/Delete?token=' + localStorage.getItem('token'), value);
  }

}
