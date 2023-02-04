import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class ListaPreciosService {

  constructor(private http: HttpClient, private global: GlobalService) { }
  
  crearEditarListaPrecios(value: any) {
    return this.http.post(this.global.urlApi + '/ApiListaPrecios/Craer/Editar?token=' + localStorage.getItem('token'), value);
  }

  ListaPreciosByIdClienteNegotis(value: any) {
    return this.http.get(this.global.urlApi + '/ApiListaPrecios/listado/Precios?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarListaPrecios(value: any) {
    return this.http.post(this.global.urlApi + '/ApiListaPrecios/Delete?token=' + localStorage.getItem('token'), value);
  }

  ListaPreciosById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiListaPrecios/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  ListaPreciosByNombre(value: any) {
    return this.http.get(this.global.urlApi + '/ApiListaPrecios/GetByNombre?token=' + localStorage.getItem('token'), { params: value });
  }

  GetListaDefault(value: any) {
    return this.http.get(this.global.urlApi + '/ApiListaPrecios/GetListaDefault?token=' + localStorage.getItem('token'), { params: value });
  }

  generarPdf(value: any) {
    return this.http.get(this.global.urlApi + '/ApiListaPrecios/Generar/Pdf?token=' + localStorage.getItem('token'), { params: value });
  }
}
