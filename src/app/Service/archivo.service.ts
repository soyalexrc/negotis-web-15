import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  


  constructor(public http: HttpClient, private global: GlobalService) { }

  saveArchivo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArchivo/Archivo/Crear?token=' + localStorage.getItem('token'), value);
  }

  deleteArchivo(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArchivo/Delete/Archivo?token=' + localStorage.getItem('token'), value);
  }

  existenciaArchivo(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArchivo/Existencia/Archivo?token=' + localStorage.getItem('token'), { params: value });
  }

  getArchivoUrl(idClienteNegotis: any, idArticulo: any,idCategoria:any,idRubro:any): any {
    return this.global.urlApi + '/ApiArchivo/GetArchivo?idClienteNegotis=' + idClienteNegotis + '&idArticulo=' + idArticulo + '&idCategoria=' + idCategoria + '&idRubro=' +  idRubro + '&token=' + localStorage.getItem('token');
  }

  obtenerArchivo(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArchivo/GetArchivo?token=' + localStorage.getItem('token'), { params: value });
  }

}
