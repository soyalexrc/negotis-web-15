import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class CategotriaRubroService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditarCategoriaRubro(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCategoriaRubro/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  listadoCategoriaRubroByIdClienteNegotis(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiCategoriaRubro/Listado/CategoriaRubro?token=' + localStorage.getItem('token'), { params: value });
  }

  getCategoriaRubroById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCategoriaRubro/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarCategoriaRubro(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCategoriaRubro/Delete?token=' + localStorage.getItem('token'), value);
  }
  
}
