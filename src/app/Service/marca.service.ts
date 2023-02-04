import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditarMarca(value: any) {
    return this.http.post(this.global.urlApi + '/ApiMarca/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  listadoMarcaByIdClienteNegotis(value: any) {
    return this.http.get(this.global.urlApi + '/ApiMarca/listado/Marcas?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarMarca(value: any) {
    return this.http.post(this.global.urlApi + '/ApiMarca/Delete?token=' + localStorage.getItem('token'), value);
  }

  getMarcaById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiMarca/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

}
