import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';
@Injectable({
  providedIn: 'root'
})
export class CajaService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  crearEditarGasto(value: any) {
    return this.http.post(this.global.urlApi + '/ApiGasto/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  getGastoById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiGasto/GetById?token=' + localStorage.getItem('token'), { params: value });
  }

  /*listGetGastoByIdClienteNegotisAndFechas(value: any) {
    return this.http.get(this.global.urlApi + '/ApiGasto/List/Get/ByIdClienteNegotis/Fechas?token=' + localStorage.getItem('token'), { params: value });
  }*/

  listGetGastoByIdSucursalFechas(value: any) {
    return this.http.get(this.global.urlApi + '/ApiGasto/List/Get/ByIdSucursal/Fechas?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarGasto(value: any) {
    return this.http.post(this.global.urlApi + '/ApiGasto/Eliminar?token=' + localStorage.getItem('token'), value);
  }

  getCajaTotales(value: any) {
    return this.http.get(this.global.urlApi + '/ApiTotales/GetTotales?token=' + localStorage.getItem('token'), { params: value });
  }

  eliminarPrestamo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPrestamo/Eliminar?token=' + localStorage.getItem('token'), value);
  }
  listGetPrestamoByIdSucursalFechas(value: any) {
    return this.http.get(this.global.urlApi + '/ApiPrestamo/List/Get/ByIdSucursal/Fechas?token=' + localStorage.getItem('token'), { params: value });
  }
  crearEditarPrestamo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPrestamo/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  pagarCuotas(value: any) {
    return this.http.post(this.global.urlApi + '/ApiPrestamo/PagarCuota?token=' + localStorage.getItem('token'),  value);
  }
  getPrestamoById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiPrestamo/GetById?token=' + localStorage.getItem('token'), { params: value });
  }
}
