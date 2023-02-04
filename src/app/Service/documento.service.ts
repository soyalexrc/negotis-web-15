import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiDocumento/Crear?token=' + localStorage.getItem('token'), value);
  }

  getLink(id: any, idClienteNegotis: any) {
    let params = [
      'token=' + localStorage.getItem('token'),
      'id=' + id,
      'idClienteNegotis=' + idClienteNegotis
    ];
    return this.global.urlApi + '/ApiDocumento/GetById?' + params.join('&');
  }

  getById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiDocumento/GetById?token=' + localStorage.getItem('token'), { params: value, responseType: 'blob' });
  }

  eliminar(value: any) {
    return this.http.get(this.global.urlApi + '/ApiDocumento/Eliminar?token=' + localStorage.getItem('token'), { params: value });
  }
}
