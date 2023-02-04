import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  getRegionById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiRegion/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiRegion/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  getRegionesByIdClienteNegotis(value: any) {
    return this.http.get(this.global.urlApi + '/ApiRegion/listado/Regiones?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiRegion/Delete?token=' + localStorage.getItem('token'), value);
  }

}
