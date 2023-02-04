import { Injectable } from '@angular/core';
import { GlobalService } from '../Service/global.service';
import { HttpClient } from '@angular/common/http';
import { CambiarEstadoCompraRequest } from '../pages/cliente/compraprovider-panel/CambiarEstadoCompraRequest';

@Injectable({
  providedIn: 'root'
})
export class CompraproveedorService {

  constructor(private http: HttpClient, private global: GlobalService) { }

  getCompraById(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCompraProveedor/GetCompraById?token=' + localStorage.getItem('token'), { params: value });
  }

  getComprasPorFiltros(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCompraProveedor/Listado/Compras?token=' + localStorage.getItem('token'), { params: value });
  }


  getComprasPorFiltrosImprimir(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCompraProveedor/Get/Pdf/Listado/Busqueda?token=' + localStorage.getItem('token'), { params: value });
  }

  getComprasPagos(value: any) {
    return this.http.get(this.global.urlApi + '/ApiCompraProveedor/Listado/CompraPagos?token=' + localStorage.getItem('token'), { params: value });
  }

  crearEditar(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCompraProveedor/Crear/Editar?token=' + localStorage.getItem('token'), value);
  }

  eliminarCompra(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCompraProveedor/Delete?token=' + localStorage.getItem('token'), value);
  }

  cambiarEstadoCompra(request: CambiarEstadoCompraRequest) {
    return this.http.post(this.global.urlApi + '/ApiCompraProveedor/CambiarEstados?token=' + localStorage.getItem('token'), request);
  }

  libroCompras(value: any): any {
    return this.http.get(this.global.urlApi + '/ApiCompraProveedor/LibroCompras?token=' + localStorage.getItem('token'), { params: value });
  }
  exportarExcel(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCompraProveedor/Exportar/Excel?token=' + localStorage.getItem('token'), value);
  }
  exportarAlicuotas(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCompraProveedor/Exportar/Alicuotas?token=' + localStorage.getItem('token'), value);
  }
  exportarTxtCompras(value: any) {
    return this.http.post(this.global.urlApi + '/ApiCompraProveedor/Exportar/TxtCompras?token=' + localStorage.getItem('token'), value);
  }

}
