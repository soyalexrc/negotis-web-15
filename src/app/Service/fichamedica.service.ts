import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';
import { FichaMedicaCrearEditarModel } from '../pages/general/fichamedica-crear-editar/fichamedica-crear-editar-model';

@Injectable({
  providedIn: 'root'
})
export class FichaMedicaService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  crearEditar(value: FichaMedicaCrearEditarModel) {
    return this.http.post(this.global.urlApi + '/ApiFichaMedica/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  getById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiFichaMedica/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  getFichaMedicaByUsuario(value: any) {
    return this.http.get(this.global.urlApi + '/ApiFichaMedica/Get/Usuario/FichasMedicas?token=' + localStorage.getItem('token'), { params: value });
  }

  borrar(value: any) : any{
    return this.http.delete(this.global.urlApi + '/ApiFichaMedica/delete?id=' + value + '&token=' + localStorage.getItem('token'));
  }

}
