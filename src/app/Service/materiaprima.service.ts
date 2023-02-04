import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  crearEditarMateriaPrima(value: any) {
    return this.http.post(this.global.urlApi + '/ApiMateriaPrima/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  ListaMPByIdClienteNegotis(value: any) : any {
    return this.http.get(this.global.urlApi + '/ApiMateriaPrima/Listado/MP?token=' + localStorage.getItem('token'), { params: value });
  }

  ListaMPUnpaginedByIdClienteNegotis(value: any) : any {
    return this.http.get(this.global.urlApi + '/ApiMateriaPrima/Listado/MateriasPrimas?token=' + localStorage.getItem('token'), { params: value });
  }

  guardarCantidadMP(value: any) {
    return this.http.post(this.global.urlApi + '/ApiMateriaPrima/Guardar/Cantidad?token=' + localStorage.getItem('token'), value);
  }

  guardarPrecioCosto(value: any) {
    return this.http.post(this.global.urlApi + '/ApiMateriaPrima/Guardar/PrecioCosto?token=' + localStorage.getItem('token'), value);
  }

  guardarArticuloMP(value: any) {
    return this.http.post(this.global.urlApi + '/ApiMateriaPrima/Guardar/ArticuloMP?token=' + localStorage.getItem('token'), value);
  }
  getMPById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiMateriaPrima/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  getMPCantById(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiMateriaPrima/GetCantidadMateriaPrima?token=' + localStorage.getItem('token'), { params: value });
  }

  generarReporte(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiMateriaPrima/Reporte?token=' + localStorage.getItem('token'), { params: value });
  }
  getMPByCodigoBarras(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiMateriaPrima/GetByCodigo?token=' + localStorage.getItem('token'), { params: value });
  }

}
