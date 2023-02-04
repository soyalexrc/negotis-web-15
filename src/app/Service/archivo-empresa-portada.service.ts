import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoEmpresaPortadaService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  guardar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArchivoEmpresaPortada/Post?token=' + localStorage.getItem('token'), value);
  }

  borrar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiArchivoEmpresaPortada/Delete?token=' + localStorage.getItem('token'), value);
  }

  existe(value: any) {
    return this.http.get(this.global.urlApi + '/ApiArchivoEmpresaPortada/Exists?token=' + localStorage.getItem('token'), { params: value });
  }

  obtenerArchivo(value: any){
    return this.http.get(this.global.urlApi + '/ApiArchivoEmpresaPortada/Get?token='+ localStorage.getItem('token'), { params: value });
  }

}
