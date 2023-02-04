import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class RubroService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  getRubroById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiRubro/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  listadoRubroByIdClienteNegotis(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiRubro/Listado/Rubros?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarRubro(value: any) {
    return this.http.post(this.global.urlApi + '/ApiRubro/Delete?token=' + localStorage.getItem('token'), value);
  }

  crearEditarRubro(value: any) {
    return this.http.post(this.global.urlApi + '/ApiRubro/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

}
