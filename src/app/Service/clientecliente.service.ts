import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../Service/global.service';
import { Observable } from 'rxjs';
import { ClienteRequestModel } from '../models/ClienteRequestModel';

@Injectable({
  providedIn: 'root'
})
export class ClienteclienteService {

  constructor(public http: HttpClient, private global: GlobalService) { }

  crearEditarCliente(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCliente/Crear/Editar?token=' + localStorage.getItem('token'), value)
  }

  listadoClientesClienteNegotis(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiCliente/Listado/PorClienteNegotis?token=' + localStorage.getItem('token'), { params: value })
  }

  clientesById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCliente/GetById?token=' + localStorage.getItem('token'), { params: value })
  }

  busquedaClientesClienteNegotisPaginado(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCliente/Busqueda/PorClienteNegotisPaginado?token=' + localStorage.getItem('token'), { params: value })
  }

  crearEditarEcommerce(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCliente/Crear/EditarEcommerce?token=' + localStorage.getItem('token'), value);
  }
  crearUsuario(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCliente/CrearUsuarioTipoCliente?token=' + localStorage.getItem('token'), value)
  }

  GetDocumentList(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCliente/GetDocumentList?token=' + localStorage.getItem('token'), { params: value });
  }

  AddDocument(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCliente/AddDocument?token=' + localStorage.getItem('token'), { params: value });
  }

  delete(value: any): any {
    return this.http.delete(this.global.urlApi + '/ApiCliente/delete?id=' + value + '&idClienteNegotis=' + localStorage.getItem('idClienteNegotis') + '&token=' + localStorage.getItem('token'));
  }

  sincronizarExcel(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCliente/Sincronizar/Excel?token=' + localStorage.getItem('token'), value);
  }

  listadoClientesClienteNegotisCompleto(value: any) {
    return new Observable<any>((observer) => {
      this.listadoClientesClienteNegotis(value).subscribe(
        (response: any) => {
          observer.next(response);

          if (response.Total <= (response.PageSize * response.Page)) { observer.complete(); return; }

          const rq = new ClienteRequestModel();
          rq.idClienteNegotis = response.IdClienteNegotis;
          rq.razonSocial = response.razonSocial;
          rq.Fantasia = response.Fantasia;
          rq.Zona = response.Zona;
          rq.CUIT = response.CUIT;
          rq.page = response.Page + 1;
          rq.pageSize = response.PageSize;

          this.listadoClientesClienteNegotisCompleto(rq).subscribe(
            moreResponse => observer.next(moreResponse),
            moreError => observer.error(),
            () => observer.complete());

        },
        (error: any) => observer.error()
      );
    });
  }
}
