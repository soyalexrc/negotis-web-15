import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class AfipService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  getListAfipByIdClienteNegotis(value: any) {
    return this.http.get(this.global.urlApi + '/ApiAfip/GetListAfipByIdClienteNegotis?token=' + localStorage.getItem('token'), { params: value });
  }

  getAfipById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiAfip/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  crearAfip(value: any) {
    return this.http.post(this.global.urlApi + '/ApiAfip/Crear?token=' + localStorage.getItem('token'), value);
  }

  eliminarAfip(value: any) {
    return this.http.post(this.global.urlApi + '/ApiAfip/Eliminar?token=' + localStorage.getItem('token'), value);
  }

}
