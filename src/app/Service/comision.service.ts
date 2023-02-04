import { Injectable } from '@angular/core';
import { GlobalService } from '../Service/global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComisionService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  getInfoInicial(value: any) {
    return this.http.get(this.global.urlApi + '/ApiComision/infoInicial?token=' + localStorage.getItem('token'), { params: value });
  }

  getListComisiones(value: any) {
    return this.http.get(this.global.urlApi + '/ApiComision/GetComisiones?token=' + localStorage.getItem('token'), { params: value });
  }

  nuevoEstado(value: any) {
    return this.http.post(this.global.urlApi + '/ApiComision/NuevoEstado?token=' + localStorage.getItem('token'), value);
  }

}
